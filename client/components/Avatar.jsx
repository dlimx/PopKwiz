import React, { useState, useEffect } from 'react';
import { useUser } from '../store/users/UserContext';
import { storage } from '../authentication/firebase';
import defaultAvatar from '../../images/defaultAvatar.png';

export const Avatar = () => {
  const { user } = useUser();
  const [avatarURL, setAvatarURL] = useState('');

  useEffect(() => {
    if (localStorage.getItem('Avatar')) {
      setAvatarURL(localStorage.getItem('Avatar'));
    } else {
      try {
        storage
          .ref()
          .child(user.picture)
          .getDownloadURL()
          .then((urll) => {
            console.log('here it is');
            console.log(urll);
            setAvatarURL(urll);
            localStorage.setItem('Avatar', urll);
          });
      } catch (error) {
        console.log('user loading...');
      }
    }
  }, [user]);
  return (
    <>
      {!user.picture ? (
        <img src={defaultAvatar} width="100px" height="100px" alt="" />
      ) : (
        <img src={avatarURL} alt="" width="100px" height="100px" />
      )}{' '}
    </>
  );
};
