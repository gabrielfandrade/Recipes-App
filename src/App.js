import { Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
// import rockGlass from './images/rockGlass.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
    </Switch>
  );
}

export default App;
