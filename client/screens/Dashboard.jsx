import React, { useState } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { useAuth } from '../store/users/AuthContext';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import {Copyright} from '../components/Copyright';
import {useStyles} from '../styles/useStyles';
import { Avatar, Button, Container, Box, Typography, CssBaseline } from '@material-ui/core';

export function Dashboard() {
  const classes = useStyles();
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
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

        {error && <Alert variant="danger">{error}</Alert>}
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>

    </Container>
  );
}
