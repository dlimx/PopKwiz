import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import { Link } from '@material-ui/core';
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

  const links = [
    { name: 'Browse', route: '/browse', class: 'fas fa-binoculars' },
    { name: 'Create', route: '/quiz/create', class: 'fas fa-file-alt' },
    { name: 'Profile', route: '/', class: 'fas fa-user-circle' },
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
          <Link href="/">
            <i
              style={{ color: '#fff', paddingLeft: '1rem', paddingRight: '2.5rem', paddingTop: '.5rem' }}
              className="fab fa-battle-net fa-3x"
            />
          </Link>
          <Typography className={classes.title} variant="h4" noWrap>
            PopKwiz
          </Typography>

          {links.map((field, index) => (
            <Typography className={classes.topLinks} noWrap>
              <i className={field.class} />
              <Link href={field.route} className={classes.topLinksColor}>
                {` ${field.name}`}
              </Link>
            </Typography>
          ))}

          <Typography className={classes.topLinks} noWrap>
            {currentUser ? (
              <div>
                <i className="fas fa-sign-out-alt" />
                <Link href="/logout" className={classes.topLinksColor}>
                  {' '}
                  Logout{' '}
                </Link>
              </div>
            ) : (
              <div>
                <i className="fas fa-sign-in-alt" />
                <Link href="/login" className={classes.topLinksColor}>
                  {' '}
                  Login{' '}
                </Link>
              </div>
            )}
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={drawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <i style={{ color: '#fff', paddingRight: '1rem' }} className="fas fa-bars fa-lg" />
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

        <Navlist drawer={drawerClose} />
      </Drawer>
    </>
  );
};
