import * as yup from 'yup';

export const quizSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  questions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required(),
        type: yup.string().required(),
        answers: yup
          .array()
          .of(
            yup.object().shape({
              answer: yup.string().required(),
              correct: yup.boolean(),
            }),
          )
          .required(),
      }),
    )
    .required(),
  categories: yup.array().of(
    yup.object().shape({
      id: yup.number(),
    }),
  ),
});

export const QuizTypes = Object.freeze({
  MultipleChoice: 'MULTIPLECHOICE',
  TrueFalse: 'TRUEFALSE',
  ShortAnswer: 'SHORTANSWER',
  // FillInTheBlank: 'FILLINTHEBLANK',
});

export const QuizStrings = Object.freeze({
  [QuizTypes.MultipleChoice]: 'Multiple Choice',
  [QuizTypes.FillInTheBlank]: 'Fill-in-the-Blank',
  [QuizTypes.TrueFalse]: 'True or False',
  [QuizTypes.ShortAnswer]: 'Short Answer',
});
