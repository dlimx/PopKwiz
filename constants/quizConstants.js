import * as yup from 'yup';

export const quizSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  questions: yup.array().of(yup.object().shape({
    question: yup.string().required(),
    type: yup.string().required(),
    answers: yup.array().of(yup.string()),
  })).required(),
  categories: yup.array().of(yup.number()),
});
