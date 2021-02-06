import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { SignUp } from './screens/Signup';
import { Dashboard } from './screens/Dashboard';
import { Login } from './screens/Login';
import { Logout } from './screens/Logout';
import { Browse } from './screens/Browse';
import { Navbar } from './components/Navbar';
import { QuizCreate } from './screens/QuizCreate/QuizCreate';
import { QuizProfile } from './screens/QuizProfile';
import { QuizAction } from './screens/QuizAction';
import { theme } from './styles/theme';
import { Copyright } from './components/Copyright';
import { ForgotPassword } from './screens/ForgotPassword';

export const Router = () => {
  return (
    <BrowserRouter>
      <>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/browse" component={Browse} />
            <Route path="/quiz/create" component={QuizCreate} />
            <Route path="/quiz/:id/action" component={QuizAction} />
            <Route path="/quiz/:id" component={QuizProfile} />
          </Switch>
          <Box mt={5}>
            <Copyright />
          </Box>
        </ThemeProvider>
      </>
    </BrowserRouter>
  );
};
