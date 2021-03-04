import firebase from 'firebase-admin';
import { db } from '../client/db';
import { QUIZZES } from '../../constants';
import { newError } from '../utils/error';
import { StatusCode } from '../utils/http';

export const getDataQuiz = (quiz) => {
  const dataQuiz = { ...quiz };

  delete dataQuiz.answers;

  return dataQuiz;
};

export const getQuizAnswers = (quiz) => {
  const quizAnswers = { ...quiz };
};

export const getCreationQuiz = async (quiz) => {
  const quizCreateBody = { ...quiz };
  delete quizCreateBody.answers;

  quizCreateBody.questions = quiz.questions.map((question) => ({
    ...question,
    options: question.options.map((option) => ({
      ...option,
      correct: !!quiz.answers[question.id][option.option],
    })),
  }));

  return quizCreateBody;
};

export const saveCreationQuiz = async (quizCreateBody) => {
  const ref = db.collection(QUIZZES).doc();
  const now = firebase.firestore.Timestamp.now();
  const payload = { ...quizCreateBody, id: ref.id, createdAt: now, updatedAt: now };

  payload.answers = {};
  quizCreateBody.questions.forEach((question) => {
    payload.answers[question.id] = {};

    question.options.forEach((option) => {
      if (option.correct) {
        payload.answers[question.id][option.option] = true;
      }
    });
  });

  payload.questions = quizCreateBody.questions.map((question) => ({
    ...question,
    options: question.options.map((option) => {
      const newOption = { ...option };
      delete newOption.correct;
      return newOption;
    }),
  }));

  try {
    await ref.set(payload);

    return { ...payload, id: ref.id };
  } catch (error) {
    console.error(error);
    throw newError(StatusCode.Error, error.message);
  }
};
