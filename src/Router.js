import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Game from './cpn/Game/Game';
import LoginScreen from './cpn/Screen/LoginScreen'
import SingupScreen from './cpn/Screen/SingupScreen'

const RouterApp = () => (
  <Router>
    <div>
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
    </div>
  </Router>
);

export default RouterApp;
