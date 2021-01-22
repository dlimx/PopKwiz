import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { Button } from '@material-ui/core';
import { useAuth } from '../store/users/AuthContext';

export function Login() {
  const email = useRef('');
  const password = useRef('');
  const { login } = useAuth()
  const history = useHistory();

  // Login using firebase authentication
  async function handleLogin(e) {
    try {
      e.preventDefault();
      let userInfo = await login(email.current.value, password.current.value);
      console.log(userInfo.user.uid);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    // TODO: Create better UI for login using MaterialUI
    <form onSubmit={handleLogin}>
      <h1>Log In Page:</h1>
      <label>
        Email:
        <input type="text" name="username" ref={email}/>
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" ref={password}/>
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>

    // <div>
    //   <h1>Page coming soon</h1>

    //   <Button variant="contained" color="primary" component={Link} to="/">
    //     Home
    //   </Button>
    // </div>
  );
};
