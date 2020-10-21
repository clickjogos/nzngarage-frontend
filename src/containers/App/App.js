import React from 'react';
import './App.scss';
import Login from '../Login/Login'
import CreatePlanning from '../CreatePlanning/CreatePlanning'
import PlanningList from '../PlanningList/PlanningList'
import RefinePlanning from '../RefinePlanning/RefinePlanning'
import { BrowserRouter, Route, Switch, Router } from 'react-router-dom';
import history from './history';
import TrackingPlanning from '../TrackingPlanning/TrackingPlanning';
import PrivateRoute from '../../authentication/PrivateRoute';
import PublicRoute from '../../authentication/PublicRoute';

function App() {
  return (

    <Router history={history}>
      <Switch>
        <PublicRoute restricted={false} component={Login} path="/" exact />
        <PrivateRoute restricted={true} component={CreatePlanning} path="/createPlanning" exact />
        <PrivateRoute restricted={true} component={PlanningList} path="/planningList" exact />
        <PrivateRoute restricted={true} component={RefinePlanning} path="/refinePlanning" exact />
        <PrivateRoute restricted={true} component={TrackingPlanning} path="/tracking" exact />
      </Switch>
    </Router>

  );
}
export default App;
