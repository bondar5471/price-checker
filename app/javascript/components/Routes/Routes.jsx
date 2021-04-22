import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import SignIn from '../SignIn';
import Home from '../Home';
import SignUp from '../SignUp';
import UserVerify from '../UserVerify';

export default function Routes() {
  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (localStorage.getItem('token') ? <Redirect to={'/home-page'} /> : <SignIn />)}
      />
      <ProtectedRoute expact path="/home-page" component={Home} />
      <Route expact path="/sign-up" component={SignUp} />
      <Route expact path="/verify/:email" component={UserVerify} />
      <Redirect to="/" />
    </Switch>
  );
}
