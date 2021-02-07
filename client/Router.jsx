import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { SignUp } from './screens/Signup';
import { useStyles } from './styles/useStyles';
import { Dashboard } from './screens/Dashboard';
import { Login } from './screens/Login';
import { Logout } from './screens/Logout';
import { Browse } from './screens/Browse';
import { Navbar } from './components/Navbar';
import { QuizCreate } from './screens/QuizCreate/QuizCreate';
import { QuizProfile } from './screens/QuizProfile';
import { QuizAction } from './screens/QuizAction';
import { QuizRate } from './screens/QuizRate';

export const Router = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <>
        <CssBaseline />
        <Navbar />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/browse" component={Browse} />

          <Route path="/quiz/create" component={QuizCreate} />
          <Route path="/quiz/:id/action" component={QuizAction} />
          <Route path="/quiz/:id/rate" component={QuizRate} />
          <Route path="/quiz/:id" component={QuizProfile} />

        </Switch>
      </>
    </BrowserRouter>
  );
};
