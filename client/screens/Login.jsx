/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */

import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Button } from '@material-ui/core';
import { useAuth } from '../store/users/AuthContext';
import { FormBuilder } from '../components/FormBuilder';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { loginWithGoogle } = useAuth();
  const history = useHistory();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  // Login using firebase authentication
  async function handleLogin(e) {
    try {
      e.preventDefault();
      const userInfo = await login(email, password);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  // Login using Google OAuth
  async function handleGoogleLogin(e) {
    try {
      e.preventDefault();
      const userInfo = await loginWithGoogle();
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FormBuilder
      header="Log In"
      onSubmit={handleLogin}
      fields={[
        {
          name: 'email',
          label: 'Email Address',
          type: 'email',
          id: 'email',
          autoComplete: 'email',
          value: email,
          onChange: handleEmailChange,
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          id: 'password',
          autoComplete: 'password',
          value: password,
          onChange: handlePasswordChange,
        },
      ]}
      buttons={[
        {
          text: 'Log In',
          onClick: handleLogin,
        },
        {
          text: 'Log In with Google',
          onClick: handleGoogleLogin,
        },
      ]}
    />
  );
}
