import React, { useEffect } from 'react';
import { useAuth } from '../store/users/AuthContext';
import { useAPI } from '../api/api';

export const LoadUser = () => {
  const { currentUser } = useAuth();
  const api = useAPI();
  useEffect(() => {
    const picture = localStorage.getItem('picture');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    if (!username || !picture || !email) {
      api.get(`/users/${currentUser.uid}`).then(({ data }) => {
        localStorage.setItem('picture', data.picture);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
      });
    }
  }, [currentUser.uid, api]);
  return <></>;
};
