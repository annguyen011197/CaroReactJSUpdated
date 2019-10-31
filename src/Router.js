import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router'
import { history } from './store'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Game from './cpn/Game/Game';
import LoginScreen from './cpn/Screen/LoginScreen'
import SingupScreen from './cpn/Screen/SingupScreen'

const RouterApp = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/game">
        <Game />
      </Route>
      <Route path="/signin">
        <LoginScreen />
      </Route>
      <Route path="/signup">
        <SingupScreen />
      </Route>
    </Switch>
  </ConnectedRouter>

);

export default RouterApp;
