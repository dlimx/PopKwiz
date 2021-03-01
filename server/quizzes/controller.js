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
  let quizSearch = '';
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
  await quizSearch.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      quizList.push(doc.data());
    });
  });

  // respond with array of quizzes
  return quizList;
};

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

export const createQuiz = async (body, file, user) => {
  const data = body;
  let quizCreateBody;
  try {
    if (file) {
      data.image = await uploadFile(quizBucket, file);
      console.log(data.image);
    }
    quizCreateBody = quizSchema.validateSync(body);
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
      .update({ rating: { [user.id]: { user_score: body.Rating, user_comment: body.Comment } } });
    return { addRating };
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.Error, error.message);
  }
};

// Helper to score quiz on back-end before POSTing
const scoreQuiz = async (quizID, userAnswers) => {
  const score = await getQuiz(quizID).then((res) => {
    const quiz = res.data();
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
    await scoreQuiz(body.quizID, body.answers)
      .then((score) => {
        body['score'] = score;
        body['userID'] = user.id;
      })
      .then(async (res) => {
        const ref = await db.collection(QUIZ_RESULTS).add(body);
        return { ...body, id: ref.id };
      });
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.Error, error.message);
  }
};
