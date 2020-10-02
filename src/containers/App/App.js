import React from 'react';
import './App.scss';
import Login from '../Login/Login'
import { BrowserRouter, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <Route path='/' exact component={Login} />
    </BrowserRouter>
  );
}
export default App;