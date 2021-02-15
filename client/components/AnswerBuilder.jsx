/* eslint react/prop-types: 0 */

import React from 'react';
import { MultipleChoice } from './QuestionTypes/MultipleChoice';
import { ShortAnswer } from './QuestionTypes/ShortAnswer';
import { TrueFalse } from './QuestionTypes/TrueFalse';
import { QuizTypes } from '../../constants/quizConstants';
import { useStyles } from '../styles/useStyles';

export const AnswerBuilder = (props) => {
  const classes = useStyles();
  const answerType = props.type;

  switch (answerType) {
    case QuizTypes.MultipleChoice:
      return (
        <MultipleChoice qid={props.qid} answers={props.answers} results={props.results} onChange={props.saveResults} />
      );
    case QuizTypes.ShortAnswer:
      return (
        <ShortAnswer qid={props.qid} answers={props.answers} results={props.results} onChange={props.saveResults} />
      );
    case QuizTypes.TrueFalse:
      return <TrueFalse qid={props.qid} answers={props.answers} results={props.results} onChange={props.saveResults} />;
    default:
      return null;
  }
};
