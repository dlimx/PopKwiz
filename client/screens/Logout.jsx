import React, { useState } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { useAuth } from '../store/users/AuthContext';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { Copyright } from '../components/Copyright';
import { useStyles } from '../styles/useStyles';

import { Avatar, Button, Container, Box, Typography, CssBaseline } from '@material-ui/core';

export function Logout() {
  // style settings
  const classes = useStyles();

  // useState
  const [error, setError] = useState('');

  // redirect
  const history = useHistory();

  // firebase functions
  const { logout } = useAuth(); // gives you access to firebase authentication functions

  // action handlers
  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login'); // move user to login screen after logout
    } catch {
      setError('Failed to log out');
    }
  }

  // jsx component rendered to screen
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentTurnedInIcon />
        </Avatar>

        <Typography component="h1" variant="h5"></Typography>

        {error && <Alert variant="danger">{error}</Alert>}

        <Button variant="contained" onClick={handleLogout}>
          Log Out
        </Button>
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
