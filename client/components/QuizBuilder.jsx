/* eslint react/prop-types: 0 */

import React from 'react';
import { Card, CardContent, Container, Typography } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';
import { useStyles } from '../styles/useStyles';
import { Copyright } from './Copyright';
import { QuestionBuilder } from './QuestionBuilder';

export const QuizBuilder = (props) => {
  const classes = useStyles();

  return (
    <Container>
      {/* {console.log(props.quiz)} */}
      <Card>
        <Typography variant="h4">Quiz: {props.quiz.name}</Typography>
        <Typography variant="subtitle1">{props.quiz.description}</Typography>
      </Card>
      <br />
      {console.log(props.quiz.questions)}
      <QuestionBuilder questions={props.quiz.questions} />
    </Container>
  );
};
