/* eslint guard-for-in: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint no-param-reassign: 0 */

import firebase from 'firebase-admin';

import { QUIZZES, QUIZ_RESULTS } from '../../constants';
import { db } from '../client/db';
import { newError } from '../utils/error';
import { StatusCode } from '../utils/http';
import { quizSchema } from '../../constants/quizConstants';
import { saveCreationQuiz } from './model';
import { quizBucket, uploadFile } from '../client/storage';

// get quizzes from firestore
export const getQuizzes = async (userQuery) => {
  // search and category conditions
  let quizSearch;
  if (userQuery.search.length > 0 && userQuery.category.length < 1) {
    quizSearch = db
      .collection(QUIZZES)
      .where('name', '>=', userQuery.search)
      .where('name', '<=', `${userQuery.search}~`);
  } else if (userQuery.search.length > 0 && userQuery.category.length > 0) {
    quizSearch = db
      .collection(QUIZZES)
      .where('name', '>=', userQuery.search)
      .where('name', '<=', `${userQuery.search}~`)
      .where('category', '==', userQuery.category);
  } else if (userQuery.search.length < 1 && userQuery.category.length > 0) {
    quizSearch = db.collection(QUIZZES).where('category', '==', userQuery.category);
  } else {
    quizSearch = db.collection(QUIZZES);
  }
  // import and append list for quizzes from database
  const quizList = [];
  //quizSearch = quizSearch.orderBy('createdAt', 'desc');
  await quizSearch.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      quizList.push(doc.data());
    });
  });

  // respond with array of quizzes
  return quizList;
};

// GET specific quiz
export const getQuiz = async (id) => {
  try {
    const quizRef = db.collection(QUIZZES).doc(id);
    const quiz = await quizRef.get();
    return quiz.data();
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.BadRequest, error.message);
  }
};

export const createQuiz = async (body, files, user) => {
  let quizCreateBody;

  try {
    quizCreateBody = quizSchema.validateSync(body);
    quizCreateBody.questionImages = {};

    if (files && files.length) {
      const promises = [];

      for (const file of files) {
        if (file.fieldname === 'image') {
          promises.push(
            (async () => {
              quizCreateBody.image = await uploadFile(quizBucket, file);
            })(),
          );
        } else if (file.fieldname.indexOf('Image') !== -1) {
          promises.push(
            (async () => {
              quizCreateBody.questionImages[file.fieldname] = await uploadFile(quizBucket, file);
            })(),
          );
        }
      }

      if (promises.length) {
        await Promise.all(promises);
      }
    }
  } catch (error) {
    throw newError(StatusCode.BadRequest, error.message);
  }

  quizCreateBody.userID = user.id;

  return saveCreationQuiz(quizCreateBody);
};

export const rateQuiz = async (body, user) => {
  try {
    const addRating = await db
      .collection(QUIZZES)
      .doc(body.Quiz)
      .set(
        { rating: { [user.id]: { user_name: user.username, user_score: body.Rating, user_comment: body.Comment } } },
        { merge: true },
      );
    return { addRating };
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.Error, error.message);
  }
};

export const delComment = async (body, user) => {
  try {
    const addRating = await db
      .collection(QUIZZES)
      .doc(body.Quiz)
      .set(
        {
          rating: {
            [user.id]: {
              user_name: user.username,
              user_score: -1,
              user_comment: '[This comment was deleted by the user]',
            },
          },
        },
        { merge: true },
      );
    return { addRating };
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.Error, error.message);
  }
};

// Helper to score quiz on back-end before POSTing
const scoreQuiz = async (quizID, userAnswers) => {
  const score = await getQuiz(quizID).then((quiz) => {
    // const quiz = res.data();
    const numQuestions = quiz.questions.length;
    const questionTypes = new Map();
    quiz.questions.forEach((question) => {
      questionTypes.set(question.id, question.type);
    });

    const quizAnswers = new Map();
    for (const qid in quiz.answers) {
      quizAnswers.set(qid, Object.keys(quiz.answers[qid]));
    }

    let totalScore = 0;
    questionTypes.forEach((questionType, key) => {
      if (quizAnswers.get(key).includes(userAnswers[key])) {
        totalScore += 1;
      }
    });
    return (totalScore / numQuestions) * 100.0;
  });
  return score;
};

export const submitQuiz = async (body, user) => {
  try {
    const quiz = await scoreQuiz(body.quizID, body.answers)
      .then((score) => {
        body['score'] = score;
        body['userID'] = user.id;
      })
      .then(async () => {
        const resultRef = db.collection(QUIZ_RESULTS).doc();
        const res = await resultRef.set(body);
        return { ...body, id: resultRef.id };
      });
    return quiz;
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.Error, error.message);
  }
};

export const getQuizResult = async (resultID) => {
  try {
    const resultRef = db.collection(QUIZ_RESULTS).doc(resultID);
    const results = await resultRef.get();
    return results.data();
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.BadRequest, error.message);
  }
};
