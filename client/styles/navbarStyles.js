import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;
export const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  logo: {
    color: theme.palette.primary.title,
  },
  margin: {
    marginLeft: theme.spacing(0),
    boxDecorationBreak: 'none',
  },
  title: {
    flexGrow: 1,
    paddingLeft: '1rem',
    // display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: theme.palette.primary.title,
  },

  topLinks: {
    flexGrow: 1,
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: theme.palette.primary.title,
  },

  topLinksColor: {
    color: theme.palette.primary.title,
  },

  fixedHeight: {
    height: 240,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    paddingTop: theme.spacing(),
    backgroundColor: theme.palette.primary.main,
  },
  appBarShift: {
    marginright: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1.8),
    marginLeft: theme.spacing(0.4),
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbar: {
    paddingRight: 14,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
}));
