/* eslint react/prop-types: 0 */

import React from 'react';
import { Card, CardContent, Container, Typography } from '@material-ui/core';
import { AnswerBuilder } from './AnswerBuilder';

export const QuestionBuilder = (props) => {
  if (props.questions) {
    console.log(props.questions);

    return (
      <div>
        {props.questions.map((question, index) => (
          <Card>
            <CardContent>
              <Typography variant="h6">Question {index + 1}</Typography>
              <Typography>{question.question}</Typography>
              <AnswerBuilder type={question.type} answers={question.answers} />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <Card>
      <Typography variant="h6">Loading...</Typography>
    </Card>
  );
};
