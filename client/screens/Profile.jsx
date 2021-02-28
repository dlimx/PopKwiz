import React from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@material-ui/core';
import { useUser } from '../store/users/UserContext';
import { useStyles } from '../styles/useStyles';

export const Profile = () => {
  const { user, avatarURL } = useUser();
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <img src={avatarURL} alt="" width="100px" height="100px" />
        <h3>USERNAME: {user.username}</h3>
        <h3>EMAIL: {user.email}</h3>
        <Link to="/update-profile">update profile</Link>
      </div>
    </Container>
  );
};
