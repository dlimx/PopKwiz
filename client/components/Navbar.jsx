// Temporary NavBar: to be changed
// reference: https://ansonlowzf.com/how-to-build-a-material-ui-navbar/

import * as React from 'react';
import {
  AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Container,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/users/AuthContext';

const useStyles = makeStyles({
  navbarDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  navDisplayFlex: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  linkText: {
    textDecoration: 'none',
    textTransform: 'uppercase',
    color: 'white',
  },
});

export const Navbar = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  // navbar will changed depending on the loggedStatus of user
  const loggedStatus = { title: 'login', path: '/login' };
  if (currentUser) {
    loggedStatus.title = 'logout';
    loggedStatus.path = '/logout';
  }

  const navLinks = [
    { title: 'create', path: '/create' },
    { title: 'browse', path: '/browse' },
    { title: 'about', path: '/about' },
    loggedStatus,
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
          <IconButton edge="start" color="inherit" aria-label="home" href="/">
            <Home fontSize="large" />
          </IconButton>
          <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
            {navLinks.map(({ title, path }) => (
              <a href={path} key={title} className={classes.linkText}>
                <ListItem button>
                  <ListItemText primary={title} />
                </ListItem>
              </a>
            ))}
          </List>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
