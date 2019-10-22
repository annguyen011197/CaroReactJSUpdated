import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Game from './cpn/Game/Game';

const RouterApp = () => (
  <Router>
    <div>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default RouterApp;
