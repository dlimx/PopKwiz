import { db } from '../database/firestore';
import { QUIZZES } from '../../constants';
import { newError } from '../utils/error';
import { StatusCode } from '../utils/http';
import { quizSchema } from '../../constants/quizConstants';

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

    return quiz;
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.BadRequest, error.message);
  }
};

export const createQuiz = async (body) => {
  let quiz;
  try {
    quiz = quizSchema.validateSync(body);
  } catch (error) {
    throw newError(StatusCode.BadRequest, error.message);
  }

  try {
    const ref = await db.collection(QUIZZES).add(quiz);

    return { ...quiz, id: ref.id };
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.Error, error.message);
  }
};
