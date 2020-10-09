import React from 'react';
import './App.scss';
import Login from '../Login/Login'
import CreatePlanning from '../CreatePlanning/CreatePlanning'

import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import history from './history';

// import {
//   BrowserRouter as Router,
//   Switch,
// } from "react-router-dom";
// import PrivateRoute from '../../authentication/PrivateRoute';
// import PublicRoute from '../../authentication/PublicRoute';
// import { Provider } from 'react-redux';
// import { Store } from '../../store/index';
// import Chat from '../Chat/Chat';
function App() {
  return (

    <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/create" component={CreatePlanning} />

                </Switch>
         </Router>
 
  );
}
export default App;

