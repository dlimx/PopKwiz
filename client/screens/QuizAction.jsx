/* eslint react/prop-types: 0 */
/* eslint react-hooks/exhaustive-deps: 0 */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useParams } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import { useAPI } from '../api/api';
import { QuizBuilder } from '../components/QuizBuilder';
import { useStyles } from '../styles/useStyles';
import { useAuth } from '../store/users/AuthContext';
import { QuizTypes } from '../../constants/quizConstants';

export const QuizAction = () => {
  const classes = useStyles();
  const api = useAPI();
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

  // Really ugly way to calculate quiz score. Should we be doing this in
  // the back-end and GET request the score?
  const scoreQuiz = () => {
    const numQuestions = quiz.questions.length;
    let numCorrect = 0;
    for (let i = 0; i < numQuestions; i++) {
      const { type } = quiz.questions[i];
      switch (type) {
        case QuizTypes.MultipleChoice: {
          for (let j = 0; j < quiz.questions[i].answers.length; j++) {
            if (
              quiz.questions[i].answers[j].correct &&
              results[quiz.questions[i].question_id] === quiz.questions[i].answers[j].answer
            ) {
              numCorrect += 1;
            }
          }
          break;
        }
        case QuizTypes.ShortAnswer: {
          for (let j = 0; j < quiz.questions[i].answers.length; j++) {
            if (quiz.questions[i].answers[j].answer === results[quiz.questions[i].question_id]) {
              numCorrect += 1;
            }
          }
          break;
        }
        case QuizTypes.TrueFalse: {
          if (
            quiz.questions[i].answers[0].answer.toLowerCase() === results[quiz.questions[i].question_id].toLowerCase()
          ) {
            numCorrect += 1;
          }
          break;
        }
        default: {
          return null;
        }
      }
    }
    console.log(`score: ${numCorrect}`);
    console.log(`out of: ${numQuestions}`);
    return (numCorrect / numQuestions) * 100.0;
  };

  const submitQuiz = async (e) => {
    e.preventDefault();
    const score = scoreQuiz();
    console.log(score);
    const body = {
      quiz_id: id,
      user_id: currentUser.uid,
      score,
      answers: results,
    };
    console.log(body);
    api.post(`/quizzes/${id}/results`, body).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    loadQuiz(id);
  }, []);

  // console.log(`user ${currentUser.uid}`)

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
