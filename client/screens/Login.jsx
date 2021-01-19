import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export const Login = () => {
  return (
    <div>
      <h1>Page coming soon</h1>
      <Button variant="contained" color="primary" component={Link} to="/">
        Home
      </Button>
    </div>
  );
};
