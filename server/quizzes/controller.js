import { db } from '../database/firestore';

// get quizzes from firestore
export const getQuizzes = async (userQuery) => {
  // search and category conditions
  let quizSearch = '';
  if (userQuery.search.length > 0 && userQuery.category.length < 1) {
    quizSearch = db.collection('quizzes').where('name', '>=', userQuery.search).where('name', '<=', `${userQuery.search}~`);
  } else if (userQuery.search.length > 0 && userQuery.category.length > 0) {
    quizSearch = db.collection('quizzes').where('name', '>=', userQuery.search).where('name', '<=', `${userQuery.search}~`).where('category', '==', userQuery.category);
  } else if (userQuery.search.length < 1 && userQuery.category.length > 0) {
    quizSearch = db.collection('quizzes').where('category', '==', userQuery.category);
  } else {
    quizSearch = db.collection('quizzes');
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
