/* eslint react/prop-types: 0 */

import React from 'react';
import { MultipleChoice } from './QuestionTypes/MultipleChoice';
import { ShortAnswer } from './QuestionTypes/ShortAnswer';
import { TrueFalse } from './QuestionTypes/TrueFalse';
import { QuizTypes } from '../../constants/quizConstants';

export const AnswerBuilder = (props) => {
  const answerType = props.type;

  switch (answerType) {
    case QuizTypes.MultipleChoice:
      return <MultipleChoice answers={props.answers} />;
    case QuizTypes.ShortAnswer:
      return <ShortAnswer answers={props.answers} />;
    case QuizTypes.TrueFalse:
      return <TrueFalse answers={props.answers} />;
    default:
      return null;
  }
};
