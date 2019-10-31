import React, { Component } from 'react';
import './App.css';
import Game from './cpn/Game/Game';
import { Provider } from 'react-redux';
import store from './store';
import RouterApp from './Router';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "./cpn/Notification/AlertTemplate/AlertTemplate";

const options = {
  timeout: 3000,
  position: positions.BOTTOM_RIGHT
};


class App extends Component {
  render() {
    return (
      <div className="App">
        <AlertProvider template={AlertTemplate} {...options}>
          <Provider store={store}>
            <RouterApp />
          </Provider>
        </AlertProvider>
      </div>
    );
  }
}

export default App;
