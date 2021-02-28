import React, { useState, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { useAPI } from '../../api/api';
import { storage } from '../../authentication/firebase';

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const api = useAPI();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({});
  const [avatarURL, setAvatarURL] = useState('');

  function updateUser(data) {
    api
      .post(`/users/picture/${currentUser.uid}`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    // api.get(`/users/${currentUser.uid}`).then(({ d }) => {
    //   setUser(d);
    // });
    window.location.reload();
  }

  useEffect(() => {
    try {
      api.get(`/users/${currentUser.uid}`).then(({ data }) => {
        setUser(data);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [api, currentUser]);

  useEffect(() => {
    try {
      storage
        .ref()
        .child(user.picture)
        .getDownloadURL()
        .then((urll) => {
          setAvatarURL(urll);
        });
    } catch (error) {
      console.log('user loading...');
    }
    setLoading(false);
  }, [currentUser, user]);

  const value = {
    user,
    avatarURL,
    updateUser,
  };

  return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
