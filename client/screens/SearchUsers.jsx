import {
  Avatar, Box, Container, CssBaseline, Typography,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import axios from 'axios';
import { Copyright } from '../components/Copyright';
import { useAuth } from '../store/users/AuthContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export function SearchUsers() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [fieldEmpty, setFieldEmpty] = useState(true);
  const [users, setUsers] = useState([]);
  const { currentUser } = useAuth();

  // get current user's token then query the api for it's users. Only works if token is authenticated.
  useEffect(() => {
    currentUser.getIdToken(true).then((idToken) => {
      axios
        .get('/api/users', {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        .then((resp) => {
          setUsers(resp.data);
        });
    });
  }, []);

  // controls the response to input being entered in the input box
  const handleInput = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setFieldEmpty(false);
    } else {
      setFieldEmpty(true);
    }
  };

  // this filters the users based on what is entered in the search box
  // if the box is empty, no users will be displayed.  This is accomplished by
  // using fieldEmpty as a state inside of the List component
  const searchedUsers = users.filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentTurnedInIcon />
        </Avatar>
        <Typography component="h1" variant="h5" />

        <Input id="search" value={searchTerm} isFocused onInputChange={handleInput}>
          <strong>Search User Database</strong>
        </Input>
        <hr />

        <List list={searchedUsers} empty={fieldEmpty} />
      </div>

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const Input = ({
  id, value, type = 'text', onInputChange, isFocused, children,
}) => {
  const inputRef = useRef();

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input ref={inputRef} id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
};
Input.propTypes = {
  children: PropTypes.node.isRequired,
  isFocused: PropTypes.node.isRequired,
  onInputChange: PropTypes.node.isRequired,
  id: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  type: PropTypes.node.isRequired,
};

const List = ({ list, empty }) => {
  if (!empty) {
    return list.map((item) => <Item key={item.objectID} item={item} />);
  }
  return <></>;
};

List.propTypes = {
  list: PropTypes.node.isRequired,
  empty: PropTypes.node.isRequired,
};

const Item = ({ item }) => (
  <div>
    <h1>{item.username}</h1>
    <h4>{item.email}</h4>
  </div>
);

Item.propTypes = {
  item: PropTypes.node.isRequired,
};
