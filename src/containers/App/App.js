import React from 'react';
import './App.scss';
import Login from '../Login/Login'
import CreatePlanning from '../CreatePlanning/CreatePlanning'

import { BrowserRouter, Route } from 'react-router-dom';
import PlanningList from '../PlanningList/PlanningList';
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
      <Route path='/' exact component={PlanningList} />
    </BrowserRouter>
  );
}
export default App;