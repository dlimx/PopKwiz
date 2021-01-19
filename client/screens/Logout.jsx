import React, { useState, useEffect } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { useAuth } from '../AuthContext';
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from 'react-router-dom';
import {Copyright} from '../components/Copyright';
import {UseStyles} from '../components/UseStyles';

import { Avatar, Button, Container, Box, Typography, CssBaseline } from '@material-ui/core';

export function Logout() {
  const classes = UseStyles();
  const [error, setError] = useState('');
  const { logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError('');
    try {
      await logout();
      history.push('/login');
    } catch {
      setError('Failed to log out');
    }
  }

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

      {/* <UserList /> */}
    </Container>
  );
}
