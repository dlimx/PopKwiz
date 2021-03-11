import React, { useContext, useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { useAPI } from '../../api/api';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const { currentUser } = useAuth();
  const api = useAPI();
  const [picture, setPicture] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [refresh, setRefresh] = useState(null);

  const pictureUpdate = (image) => {
    setPicture(image);
  };

  useEffect(() => {
    try {
      api.get(`/users/${currentUser?.uid}?random_number=${new Date().getTime()}`).then(({ data }) => {
        setPicture(data.picture);
        setUsername(data.username);
        setEmail(data.email);
      });
    } catch (error) {
      console.error(error);
    }
  }, [api, currentUser?.uid, refresh]);

  const value = { picture, email, username, setRefresh, pictureUpdate };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
