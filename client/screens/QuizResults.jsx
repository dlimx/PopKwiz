/* eslint no-unused-vars: 0 */
/* eslint prefer-destructuring: 0 */
/* eslint react/prop-types: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Card, Container, Divider, Typography } from '@material-ui/core';
import { useAPI } from '../api/api';
import { useAuth } from '../store/users/AuthContext';
import { useStyles } from '../styles/useStyles';
import { QuizBuilder } from '../components/QuizBuilder';

const withQuizBuilderResults = (Component) => (props) => {
  const quiz = props.quiz || undefined;
  const quizAnswers = props.quizAnswers || undefined;
  const userAnswers = props.userAnswers || undefined;
  if (quiz && quizAnswers && userAnswers) {
    return <Component quiz={quiz} quizAnswers={quizAnswers} userAnswers={userAnswers} />;
  }
  return <div>Loading...</div>;
};
// props.quiz && props.quizAnswers && props.userAnswers
// ? <Component quiz={props.quiz} quizAnswers={props.quizAnswers} userAnswers={props.userAnswers} />

export const QuizResults = (props) => {
  const resultID = props.location.state['resultID'];
  const { id } = useParams();
  const api = useAPI();
  const auth = useAuth();
  const classes = useStyles();
  const history = useHistory();
  const [quiz, setQuiz] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});
  const [userAnswers, setUserAnswers] = useState({});

  const loadUserAnswers = async (quizID) => {
    api.get(`/quizzes/${quizID}/results/${resultID}`).then((res) => {
      setUserAnswers(res.data.results);
    });
  };

  const loadQuiz = async (quizID) => {
    api.get(`/quizzes/${quizID}`).then((res) => {
      setQuiz(res.data.data);
    });
  };

  const loadQuizAnswers = async (quizID) => {
    api.get(`/quizzes/${quizID}/answers`).then((res) => {
      setQuizAnswers(res.data.data.answers);
    });
  };

  const navigateHome = () => {
    history.push('/');
  };

  useEffect(() => {
    loadUserAnswers(resultID);
    loadQuiz(id);
    loadQuizAnswers(id);
  }, []);

  const QuizBuilderWithResults = withQuizBuilderResults(QuizBuilder);

  return (
    <Container maxWidth="md">
      <Container maxWidth="md">
        <Card>
          <Typography className={classes.typographyText} variant="h4">
            Results
          </Typography>
          <Divider className={classes.divider} variant="fullWidth" />
          <Typography className={classes.typographyText} variant="h5">
            Score: {userAnswers.score}%
          </Typography>
        </Card>
      </Container>
      <form className={classes.form}>
        <QuizBuilderWithResults quiz={quiz} userAnswers={userAnswers} quizAnswers={quizAnswers} />
        {/* <QuizBuilder quiz={quiz} userAnswers={results} quizAnswers={quizAnswers}/> */}
      </form>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={navigateHome}
      >
        Return to Home
      </Button>
    </Container>
  );
};
