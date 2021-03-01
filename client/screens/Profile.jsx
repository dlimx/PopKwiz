import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Avatar, Button, Container, Typography, CssBaseline, Grid, TextField } from '@material-ui/core';

import { useStyles } from '../styles/useStyles';
import { ImageUploadPreview } from '../components/ImageUploadPreview';

import { useAuth } from '../store/users/AuthContext';
import { useAPI } from '../api/api';

export const Profile = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');
  const api = useAPI();

  const uploadAvatar = useCallback(
    (data) => {
      let body;
      if (image) {
        body = new FormData();
        // Object.keys(data).forEach((key) => {
        //   body.append(key, JSON.stringify(data[key]));
        // });
        body.append('image', image);
      } else {
        body = data;
      }
      api.post('/users/picture', body).then((res) => {
        // history.push('/');
      });
    },
    [api, image],
  );

  useEffect(() => {
    api.get(`/users/${currentUser.uid}`).then(({ data }) => {
      setUser(data);
      setImage(data.picture);
      console.log(data.picture);
    });
  }, [currentUser.uid, api, uploadAvatar]);

  return (
    <Container maxWidth="xs">
      <ImageUploadPreview image={image} setImage={setImage} />
      <Button onClick={uploadAvatar}>Add to Storage</Button>
      <div className={classes.paper}>
        <h1>Picture goes here</h1>
        <h3>USERNAME: {user.username}</h3>
        <h3>EMAIL: {user.email}</h3>
        <Link to="/update-profile">update profile</Link>
      </div>
      <img src={image} alt="" width="100px" height="100px" />
    </Container>
  );
};
