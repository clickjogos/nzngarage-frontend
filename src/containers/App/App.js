import React from 'react';
import './App.scss';
import Login from '../Login/Login'
import CreatePlanning from '../CreatePlanning/CreatePlanning'
<<<<<<< HEAD
import RefinePlanning from '../RefinePlanning/RefinePlanning'
=======
import PlanningList from '../PlanningList/PlanningList'


import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import history from './history';
>>>>>>> dev

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
<<<<<<< HEAD
    <BrowserRouter>
      <Route path='/' exact component={RefinePlanning} />
    </BrowserRouter>
=======

    <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/createPlanning" component={CreatePlanning} />
                    <Route path='/planningList' exact component={PlanningList} />


                </Switch>
         </Router>
 
>>>>>>> dev
  );
}
export default App;

