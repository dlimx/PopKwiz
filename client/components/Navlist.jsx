/* eslint react/prop-types: 0 */

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';

const drawerItems = [
  { route: '/signup', class: 'fas fa-user-plus', text: 'Sign Up' },
  { route: '/login', class: 'fas fa-sign-in-alt', text: 'Log In' },
  { route: '/forgot-password', class: 'fas fa-unlock-alt', text: 'Reset Password' },
  { route: '/browse', class: 'fas fa-binoculars', text: 'Browse Quizzes' },
  { route: '/quiz/create', class: 'fas fa-file-alt', text: 'Create Quiz' },
];

export const Navlist = (props) => {
  return (
    <List className="drawer-items">
      {drawerItems.map((field) => (
        <ListItem button component={Link} to={field.route} onClick={props.drawer}>
          <ListItemIcon>
            <i className={field.class} />
          </ListItemIcon>
          <ListItemText primary={field.text} />
        </ListItem>
      ))}
    </List>
  );
};
