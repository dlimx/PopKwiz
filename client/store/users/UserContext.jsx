import React, { useState, useEffect, useContext, createContext } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from './AuthContext';
import { useAPI } from '../../api/api';

export const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const api = useAPI();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const updateUser = async (data) => {
    try {
      const res = await api.post(`/users/picture/${currentUser.uid}`, data);
      setUser(res.data);

      console.log('user set by updateUser');
      console.log(res.data.picture);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      api.get(`/users/${currentUser.uid}`).then(({ data }) => {
        setUser(data);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [api, currentUser.uid]);

  const value = {
    user,
    updateUser,
  };

  return <UserContext.Provider value={value}>{!loading && children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
