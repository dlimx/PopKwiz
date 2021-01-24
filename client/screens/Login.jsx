import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
// import { Button } from '@material-ui/core';
import { useAuth } from '../store/users/AuthContext';

export function Login() {
  const email = useRef('');
  const password = useRef('');
  const { login } = useAuth();
  const { loginWithGoogle } = useAuth();
  const history = useHistory();

  // Login using firebase authentication
  async function handleLogin(e) {
    try {
      e.preventDefault();
      const userInfo = await login(email.current.value, password.current.value);
      console.log(userInfo.user.uid);
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
      console.log(userInfo);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // TODO: Create better UI for login using MaterialUI
    <form onSubmit={handleLogin}>
      <h1>Log In Page:</h1>
      <label htmlFor="username">
        Email:
        <input id="username" type="text" name="username" ref={email} />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input id="password" type="password" name="password" ref={password} />
      </label>
      <br />
      <input type="submit" value="Submit" />
      <br />
      <button type="button" onClick={handleGoogleLogin}>Sign in with Google</button>
    </form>

  // <div>
  //   <h1>Page coming soon</h1>

  //   <Button variant="contained" color="primary" component={Link} to="/">
  //     Home
  //   </Button>
  // </div>
  );
}
