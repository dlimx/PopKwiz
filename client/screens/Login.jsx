import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../store/users/AuthContext';
import { FormBuilder } from '../components/FormBuilder';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { loginWithGoogle } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const onSuccess = () => {
    const query = new URLSearchParams(location.search);
    history.push(query.get('to') || '/');
  };

  // Login using firebase authentication
  async function handleLogin(e) {
    try {
      e.preventDefault();
      await login(email, password);
      onSuccess();
    } catch (error) {
      console.error(error);
    }
  }

  // Login using Google OAuth
  async function handleGoogleLogin(e) {
    try {
      e.preventDefault();
      await loginWithGoogle();
      onSuccess();
    } catch (error) {
      console.error(error);
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
