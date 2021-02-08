import React, { useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../store/users/AuthContext';
import { FormBuilder } from '../components/FormBuilder';

export function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setconfPassword] = useState('');
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleName = (value) => {
    setName(value);
  };
  const handleEmail = (value) => {
    setEmail(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };
  const handleConfPassword = (value) => {
    setconfPassword(value);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confPassword) {
      return setError('Passwords do not match');
    }

    // signup user with firebase authentication
    try {
      setError('');
      setLoading(true);
      await signup(name, email, password);
      setMessage('Account successfully created!');
      history.push('/');
    } catch (err) {
      setError('Failed to create an account');
    }

    setLoading(false);
    return 0;
  }

  return (
    <FormBuilder
      header="Sign Up"
      fields={[
        {
          name: 'username',
          label: 'user name',
          type: 'text',
          id: 'username',
          autoComplete: 'username',
          onChange: handleName,
        },
        {
          name: 'email',
          label: 'email',
          type: 'email',
          id: 'email',
          autoComplete: 'email',
          onChange: handleEmail,
        },
        {
          name: 'password',
          label: 'password',
          type: 'password',
          id: 'password',
          autoComplete: 'password',
          onChange: handlePassword,
        },
        {
          name: 'confpassword',
          label: 'confirm password',
          type: 'password',
          id: 'confpassword',
          autoComplete: 'confpassword',
          onChange: handleConfPassword,
        },
      ]}
      buttons={[
        {
          text: 'Submit',
          onClick: handleSubmit,
        },
      ]}
    >
      <PersonAddIcon />
    </FormBuilder>
  );
}
