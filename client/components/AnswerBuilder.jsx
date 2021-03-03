/* eslint react/prop-types: 0 */

import React from 'react';
import { MultipleChoice } from './QuestionTypes/MultipleChoice';
import { ShortAnswer } from './QuestionTypes/ShortAnswer';
import { TrueFalse } from './QuestionTypes/TrueFalse';
import { QuizTypes } from '../../constants/quizConstants';
import { useStyles } from '../styles/useStyles';

export const AnswerBuilder = ({ type, ...rest }) => {
  const classes = useStyles();
  const props = { ...rest };

  // const answerType = props.type;

  switch (type) {
    case QuizTypes.MultipleChoice:
      return <MultipleChoice {...props} />;
    // return (
    // <MultipleChoice qid={props.qid} answers={props.answers} results={props.results} onChange={props.saveResults} />
    // );
    case QuizTypes.ShortAnswer:
      return <ShortAnswer {...props} />;
    // return (
    // <ShortAnswer qid={props.qid} answers={props.answers} results={props.results} onChange={props.saveResults} />
    // );
    case QuizTypes.TrueFalse:
      return <TrueFalse {...props} />;
    // return <TrueFalse qid={props.qid} answers={props.answers} results={props.results} onChange={props.saveResults} />;
    default:
      return null;
  }
};
