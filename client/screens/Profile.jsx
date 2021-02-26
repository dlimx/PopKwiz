import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@material-ui/core';

import { useStyles } from '../styles/useStyles';
import { storage } from '../authentication/firebase';
import { useAuth } from '../store/users/AuthContext';
import { useAPI } from '../api/api';

export const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [url, setURL] = useState('');
  const api = useAPI();

  // get user info
  useEffect(() => {
    localStorage.clear();
    if (!localStorage.getItem('user')) {
      api.get(`/users/${currentUser.uid}`).then(({ data }) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      });
    } else {
      const obj = localStorage.getItem('user');
      setUser(JSON.parse(obj));
    }
  }, [currentUser.uid, api]);

  // fetch image URL from firebase storage
  useEffect(() => {
    if (localStorage.getItem('avatar')) {
      setURL(localStorage.getItem('avatar'));
    } else {
      try {
        storage
          .ref()
          .child(user.picture)
          .getDownloadURL()
          .then((urll) => {
            setURL(urll);
            localStorage.setItem('avatar', urll);
          });
      } catch (error) {
        console.log('user loading...');
      }
    }
  }, [user]);

  return (
    <Container maxWidth="xs">
      <img src={url} alt="" width="100px" height="100px" />
      <div className={classes.paper}>
        <h1>Picture goes here</h1>
        <h3>USERNAME: {user.username}</h3>
        <h3>EMAIL: {user.email}</h3>
        <Link to="/update-profile">update profile</Link>
      </div>
    </Container>
  );
};
