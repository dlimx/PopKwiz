import React, { useState } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import {
  Avatar, Button, Container, Box, Typography, CssBaseline,
} from '@material-ui/core';
import { useAuth } from '../store/users/AuthContext';
import { Copyright } from '../components/Copyright';
import { useStyles } from '../styles/useStyles';

export function Dashboard() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentTurnedInIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Welcome to PopKwiz
        </Typography>

        {currentUser && <h4>{`${currentUser.email}`}</h4>}

        <h6>Dashboard goes here</h6>

        <p>Building in progress </p>

        <Button variant="contained" color="primary" component={Link} to="/logout">
          Logout
        </Button>

        <br />

        <Button variant="contained" color="primary" component={Link} to="/signup">
          Signup Page
        </Button>

        <br />

        <Button variant="contained" color="primary" component={Link} to="/login">
          Login Page
        </Button>
        <br />

        <Button variant="contained" color="primary" component={Link} to="/search-users">
          Search User Database
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
