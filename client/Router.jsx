import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { UserProvider } from './store/users/UserContext';

import { SignUp } from './screens/Signup';
import { Login } from './screens/Login';
import { Logout } from './screens/Logout';
import { Browse } from './screens/Browse';
import { Navbar } from './components/Navbar';
import { Profile } from './screens/Profile';

import { ProfileUpdate } from './screens/ProfileUpdate';
import { QuizCreate } from './screens/QuizCreate/QuizCreate';
import { QuizProfile } from './screens/QuizProfile';
import { QuizAction } from './screens/QuizAction';
import { QuizResults } from './screens/QuizResults';
import { QuizRate } from './screens/QuizRate';

import { theme } from './styles/theme';
import { Copyright } from './components/Copyright';
import { ForgotPassword } from './screens/ForgotPassword';

export const Router = () => {
  return (
    <BrowserRouter>
      <>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <Switch>
              <Route exact path="/" component={Browse} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/quiz/create" component={QuizCreate} />
              <Route path="/quiz/:id/action" component={QuizAction} />
              <Route path="/quiz/:id/results" component={QuizResults} />
              <Route path="/quiz/:id/rate" component={QuizRate} />
              <Route path="/quiz/:id" component={QuizProfile} />
              <Route path="/profile" component={Profile} />
              <Route path="/update-profile" component={ProfileUpdate} />
            </Switch>
            <Box mt={5}>
              <Copyright />
            </Box>
          </ThemeProvider>
        </UserProvider>
      </>
    </BrowserRouter>
  );
};
