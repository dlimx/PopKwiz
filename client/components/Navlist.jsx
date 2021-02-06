/* eslint react/prop-types: 0 */

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';

export const Navlist = (props) => {
  return (
    <List className="drawer-items">
      <ListItem button component={Link} to="/signup" onClick={props.drawer}>
        <ListItemIcon>
          <i className="fas fa-user-plus" />
        </ListItemIcon>
        <ListItemText primary="Sign Up" />
      </ListItem>

      <ListItem button component={Link} to="/login" onClick={props.drawer}>
        <ListItemIcon>
          <i className="fas fa-sign-in-alt" />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>

      <ListItem button component={Link} to="/forgot-password" onClick={props.drawer}>
        <ListItemIcon>
          <i className="fas fa-unlock-alt" />
        </ListItemIcon>
        <ListItemText primary="Reset Password" />
      </ListItem>

      <ListItem button component={Link} to="/browse" onClick={props.drawer}>
        <ListItemIcon>
          <i className="fas fa-binoculars" />
        </ListItemIcon>
        <ListItemText primary="Browse Quizzes" />
      </ListItem>

      <ListItem button component={Link} to="/quiz/create" onClick={props.drawer}>
        <ListItemIcon>
          <i className="fas fa-file-alt" />
        </ListItemIcon>
        <ListItemText primary="Create Quiz" />
      </ListItem>
    </List>
  );
};
