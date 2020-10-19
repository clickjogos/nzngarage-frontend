import React from 'react';
import './App.scss';
import Login from '../Login/Login'
import CreatePlanning from '../CreatePlanning/CreatePlanning'
import PlanningList from '../PlanningList/PlanningList'
import RefinePlanning from '../RefinePlanning/RefinePlanning'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import history from './history';
import TrackingPlanning from '../TrackingPlanning/TrackingPlanning'

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
        <Route path="/createPlanning" component={CreatePlanning} />
        <Route path='/planningList' exact component={PlanningList} />
        <Route path="/refinePlanning" exact component={RefinePlanning} />
        <Route path="/tracking" exact component={TrackingPlanning} />
      </Switch>
    </Router>

  );
}
export default App;
