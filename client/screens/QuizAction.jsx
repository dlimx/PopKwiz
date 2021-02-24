/* eslint react/prop-types: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { useAPI } from '../api/api';
import { QuizBuilder } from '../components/QuizBuilder';
import { useStyles } from '../styles/useStyles';
import { useAuth } from '../store/users/AuthContext';
import { QuizTypes } from '../../constants/quizConstants';

export const QuizAction = () => {
  const classes = useStyles();
  const api = useAPI();
  const history = useHistory();

  const [quiz, setQuiz] = useState({});
  const [results, setResults] = useState({});
  const { id } = useParams();
  // Temp way to get user_id
  const { currentUser } = useAuth();

  const loadQuiz = async (quizID) => {
    api.get(`/quizzes/${quizID}`).then((res) => {
      setQuiz(res.data.data);
    });
  };

  const handleResults = (qid, value) => {
    setResults({ ...results, [qid]: value });
  };

  const submitQuiz = async (e) => {
    e.preventDefault();
    const body = {
      quizID: id,
      userID: currentUser.uid,
      answers: results,
    };
    api.post(`/quizzes/${id}/results`, body).then((res) => {
      console.log(res);
      history.push(`/quiz/${id}/results`);
    });
  };

  useEffect(() => {
    loadQuiz(id);
  }, []);

  return (
    <Container maxWidth="md">
      <form className={classes.form}>
        <QuizBuilder quiz={quiz} results={results} saveResults={handleResults} />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submitQuiz}
        >
          Submit Quiz
        </Button>
      </form>
    </Container>
  );
};
