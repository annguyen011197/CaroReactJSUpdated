import React, { Component } from 'react';
import './App.css';
import Game from './cpn/Game/Game';
import { Provider } from 'react-redux';
import store from './store';
import RouterApp from './Router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <RouterApp />
        </Provider>
      </div>
    );
  }
}

export default App;
