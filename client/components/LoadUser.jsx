import React, { useEffect } from 'react';
import { useAuth } from '../store/users/AuthContext';
import { useAPI } from '../api/api';

export const LoadUser = () => {
  const { currentUser } = useAuth();
  const api = useAPI();

  const getUser = () => {
    try {
      api.get(`/users/${currentUser.uid}`).then(({ data }) => {
        localStorage.setItem('picture', data.picture);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem('picture') === 'undefined' ||
      localStorage.getItem('username') === 'undefined' ||
      localStorage.getItem('email') === 'undefined' ||
      !localStorage.getItem('picture') ||
      !localStorage.getItem('username') ||
      !localStorage.getItem('email')
    ) {
      localStorage.clear();
      getUser();
    }
  });
  return null;
};
