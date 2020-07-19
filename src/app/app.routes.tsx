import React, { useContext } from 'react';
import { Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import history from './app.history';
import HomePage from 'pages/home.page';
import { ROUTE } from './app.route-path';
import PageNotFound from 'ui/404.layout';
import InboxPage from 'pages/inbox.page';
import { AuthContext } from './app.context';

const AuthenticatedRoute = (props: any) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) return <Route {...props} />;

  return <Redirect to={ROUTE.HOME} />;
};

export const PrivateRoute = withRouter(AuthenticatedRoute);

const NonAuthenticatedRoute = (props: any) => {
  // const { isAuthenticated } = useContext(AuthContext);

  // if (isAuthenticated) return <Redirect to={ROUTE.INBOX} />;

  return <Route {...props} />;
};

export const PublicRoute = withRouter(NonAuthenticatedRoute);

const Routes = () => (
  <Router history={history}>
    <Switch>
      <PublicRoute exact path={ROUTE.HOME} component={HomePage} />
      <PrivateRoute exact path={ROUTE.INBOX} component={InboxPage} />
      <Route component={PageNotFound} />
    </Switch>
  </Router>
);

export default Routes;
