/* eslint react/prop-types: 0 */

import React from 'react';
import { Card, CardContent, Container, Divider, Typography } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';
// import { useStyles } from '../styles/useStyles';
import { makeStyles } from '@material-ui/core/styles';
import { Copyright } from './Copyright';
import { QuestionBuilder } from './QuestionBuilder';

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export const QuizBuilder = (props) => {
  const classes = useStyles();

  return (
    <Container claaName={classes.container}>
      <Card>
        <Typography variant="h4">Quiz: {props.quiz.name}</Typography>
        <Divider className={classes.divider} variant="fullWidth" />
        <Typography variant="subtitle1">{props.quiz.description}</Typography>
      </Card>
      <br />
      {console.log(props.quiz.questions)}
      <QuestionBuilder questions={props.quiz.questions} />
    </Container>
  );
};
