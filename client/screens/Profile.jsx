import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '../store/users/UserContext';

const useStyles = () => {
  const styles = makeStyles((theme) => ({
    card: {
      maxWidth: 500,
      maxHeight: 300,
    },
    media: {
      paddingTop: '1%', // 16:9
    },
  }));

  return styles();
};

export const Profile = () => {
  const styles = useStyles();
  const { picture, username, email } = useUser();

  return (
    <>
      <Container maxWidth="xs">
        <Card className={styles.card}>
          <CardMedia className={styles.media}>
            <img src={picture} alt="" height="300px" width="500px" />
          </CardMedia>
        </Card>

        <div style={{ margin: 'auto', width: '50%' }}>
          <h3>USERNAME: {username}</h3>
          <h3>EMAIL: {email}</h3>
          <Link to="/update-profile">update profile</Link>
        </div>
      </Container>
    </>
  );
};
