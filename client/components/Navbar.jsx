import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import logo from '../icons/learning.svg';

import { Navlist } from './Navlist';
import { useStyles } from '../styles/navbarStyles';
import { useAuth } from '../store/users/AuthContext';

export const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();

  // handle opening and closing of app drawer
  const drawerOpen = () => {
    setOpen(true);
  };

  const drawerClose = () => {
    setOpen(false);
  };

  const itemsCommon = [{ id: '0', route: '/', icon: <VisibilityIcon />, text: 'Browse' }];

  const itemsLoggedIn = [
    { id: '1', route: '/logout', icon: <AccountCircleIcon />, text: 'Log Out' },
    { id: '2', route: '/profile', icon: <LockOpenIcon />, text: 'Profile' },
    { id: '3', route: '/quiz/create', icon: <CreateIcon />, text: 'Create' },
    ...itemsCommon,
  ];

  const itemsLoggedOut = [
    { id: '4', route: '/signup', icon: <PersonAddIcon />, text: 'Sign Up' },
    { id: '5', route: '/login', icon: <AccountCircleIcon />, text: 'Log In' },
    { id: '6', route: '/forgot-password', icon: <LockOpenIcon />, text: 'Reset Password' },

    ...itemsCommon,
  ];

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Link to="/" style={{ paddingLeft: '1rem' }}>
            <img src={logo} width="40px" height="40px" alt="" style={{ height: 40, width: 40 }} />;
          </Link>
          <Typography className={classes.title} variant="h4" noWrap>
            PopKwiz
          </Typography>

          {currentUser
            ? itemsLoggedIn.map((field) => (
                // eslint-disable-next-line react/no-array-index-key
                <Typography key={field.id} className={classes.topLinks} noWrap>
                  {field.icon}
                  <Link to={field.route} className={classes.topLinksColor}>
                    {` ${field.text}`}
                  </Link>
                </Typography>
              ))
            : itemsLoggedOut.map((field) => (
                <Typography key={field.id} className={classes.topLinks} noWrap>
                  {field.icon}
                  <Link to={field.route} className={classes.topLinksColor}>
                    {` ${field.text}`}
                  </Link>
                </Typography>
              ))}

          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={drawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon large style={{ transform: 'scale(2)', color: '#fff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        variant="temporary"
        classes={{
          paper: clsx('navbar', classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={drawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        {currentUser ? (
          <Navlist drawer={drawerClose} items={itemsLoggedIn} />
        ) : (
          <Navlist drawer={drawerClose} items={itemsLoggedOut} />
        )}
      </Drawer>
    </>
  );
};
