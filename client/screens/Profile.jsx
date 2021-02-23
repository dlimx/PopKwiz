import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Button, Container, Typography, CssBaseline, Grid, TextField } from '@material-ui/core';

import { useStyles } from '../styles/useStyles';

import { useAuth } from '../store/users/AuthContext';
import { useAPI } from '../api/api';

export const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const api = useAPI();

  useEffect(() => {
    api.get(`/users/${currentUser.uid}`).then(({ data }) => {
      setUser(data);
    });
  }, [currentUser.uid, api]);

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <h1>Picture goes here</h1>
        <h3>USERNAME: {user.username}</h3>
        <h3>EMAIL: {user.email}</h3>
        <Link to="/update-profile">update profile</Link>
      </div>
    </Container>
  );
};
