import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { SignUp } from './screens/Signup';
import { useStyles } from './styles/useStyles';
import { Dashboard } from './screens/Dashboard';
import { Login } from './screens/Login';
import { Logout } from './screens/Logout';
import { Browse } from './screens/Browse';
import { Navbar } from './components/Navbar';
import { QuizCreate } from './screens/QuizCreate';
import { QuizProfile } from './screens/QuizProfile';
import { QuizAction } from './screens/QuizAction';

export const Router = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div>
        <CssBaseline className={classes.root} />
        <Navbar />
        <Container className={classes.paper2} style={{ minHeight: '100vh' }}>
          <div className="w-100">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/browse" component={Browse} />

              <Route path="/quiz/create" component={QuizCreate} />
              <Route path="/quiz/:id/action" component={QuizAction} />
              <Route path="/quiz/:id" component={QuizProfile} />
            </Switch>
          </div>
        </Container>
      </div>
    </BrowserRouter>
  );
};
