import React, { useRef, useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar, Button, Container, Box, Typography, CssBaseline, Grid, TextField,
} from '@material-ui/core';
import { useAuth } from '../store/users/AuthContext';
import { Copyright } from '../components/Copyright';
import { useStyles } from '../styles/useStyles';

export function SignUp() {
  // firestore and firebase parameters
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const passwordConfirmRef = useRef();

  // useState
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // redirect
  const history = useHistory();

  // firebase functions
  const { signup } = useAuth();

  // action handlers
  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError('Passwords do not match');
      return;
    }

    // signup user with firebase authentication
    try {
      setError('');
      setLoading(true);
      await signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
      setMessage('Account successfully created!');
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  }

  // jsx component rendered to screen
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                inputRef={usernameRef}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputRef={emailRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordRef}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordConfirmRef}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
