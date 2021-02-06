/* eslint react/prop-types: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { useAPI } from '../api/api';
import { QuizBuilder } from '../components/QuizBuilder';
import { useStyles } from '../styles/useStyles';

export const QuizAction = () => {
  const classes = useStyles();
  const api = useAPI();
  const [quiz, setQuiz] = useState({});
  const { id } = useParams();

  const loadQuiz = async (quizID) => {
    api.get(`/quizzes/${quizID}`).then((res) => {
      setQuiz(res.data.data);
    });
  };

  useEffect(() => {
    loadQuiz(id);
  }, []);

  return (
    <Container maxWidth="md">
      <form className={classes.form}>
        <QuizBuilder quiz={quiz} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          //   onClick={button.onClick}
        >
          Submit Quiz
        </Button>
      </form>
    </Container>
  );
};
