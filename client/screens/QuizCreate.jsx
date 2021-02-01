import React, { useCallback, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Avatar, Button, Container, Box, Typography, CssBaseline, Grid, TextField,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../store/users/AuthContext';
import { useAPI } from '../api/api';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export const QuizCreate = () => {
  const auth = useAuth();
  const api = useAPI();
  const classes = useStyles();

  const [questions, setQuestion] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get('/categories').then(({ data }) => {
      setCategories(data.data);
    });
  }, []);

  const createQuiz = useCallback(() => {
    api.post('/quizzes').then(({ data }) => {
    });
  }, [api]);

  if (!auth.currentUser) {
    return <Redirect to="/login?to=/quiz/create" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h2">
          Create Quiz
        </Typography>
        <form className={classes.form} />
      </div>
    </Container>
  );
};
