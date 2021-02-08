import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';

export const Navlist = (props) => {
  Navlist.propTypes = {
    items: PropTypes.array.isRequired,
    drawer: PropTypes.func.isRequired,
  };
  return (
    <List className="drawer-items">
      {props.items.map((field) => (
        <ListItem button component={Link} to={field.route} onClick={props.drawer} key={field.id}>
          <ListItemIcon>{field.icon}</ListItemIcon>
          <ListItemText primary={field.text} />
        </ListItem>
      ))}
    </List>
  );
};
