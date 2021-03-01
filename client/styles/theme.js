import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    // type: 'light',
    primary: {
      main: '#4267b2',
      title: '#fff',
    },
    background: {
      // default: '#121212',
      // paper: '#242424',
      default: '#fff',
      paper: '#fff',
      greyMedium: '#d9d9d9',
      greyLight: '#f0f0f0',
    },
    secondary: {
      main: '#f50004',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});
