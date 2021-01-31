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
  // const email = useRef('a');
  // const password = useRef('');
  const { login } = useAuth();
  const { loginWithGoogle } = useAuth();
  const history = useHistory();

  const handleEmailChange = (value) => {
    console.log(value);
    setEmail(value);
  };

  function handlePasswordChange(value) {
    setPassword(value);
  }

  // Login using firebase authentication
  async function handleLogin(e) {
    try {
      e.preventDefault();
      // console.log(password.current.value);
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
          inputRef: { email },
          onChange: { handleEmailChange },
          // onChange: {onChange={() => this.handleEmailChange()}}
        },
        // {
        //   name: 'password',
        //   label: 'Password',
        //   type: 'password',
        //   id: 'password',
        //   autoComplete: 'password',
        //   inputRef: {password},
        //   onChange: {handlePasswordChange}
        // }
      ]}
      buttons={[
        {
          text: 'Log In',
        }, {
          text: 'Log In with Google',
        },
      ]}
    />

  // <form onSubmit={handleLogin}>
  //   <h1>Log In Page:</h1>
  //   <label htmlFor="username">
  //     Email:
  //     <input id="username" type="text" name="username" ref={email} />
  //   </label>
  //   <br />
  //   <label htmlFor="password">
  //     Password:
  //     <input id="password" type="password" name="password" ref={password} />
  //   </label>
  //   <br />
  //   <input type="submit" value="Submit" />
  //   <br />
  //   <button type="button" onClick={handleGoogleLogin}>Sign in with Google</button>
  // </form>
  );
}
