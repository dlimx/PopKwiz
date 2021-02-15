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
        options: yup
          .array()
          .of(
            yup.object().shape({
              option: yup.string().required(),
              correct: yup.boolean().required(),
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

export const QuizConstants = Object.freeze({
  True: 'TRUE',
  False: 'FALSE',
});

export const QuizStrings = Object.freeze({
  [QuizTypes.MultipleChoice]: 'Multiple Choice',
  [QuizTypes.FillInTheBlank]: 'Fill-in-the-Blank',
  [QuizTypes.TrueFalse]: 'True or False',
  [QuizTypes.ShortAnswer]: 'Short Answer',

  [QuizConstants.True]: 'True',
  [QuizConstants.False]: 'False',
});
