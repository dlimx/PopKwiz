import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../store/users/AuthContext';

// https://github.com/WebDevSimplified/React-Firebase-Auth
export function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
};
