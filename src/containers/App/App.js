import React from 'react';

import { Switch, Router } from 'react-router-dom';
import PrivateRoute from '../../authentication/PrivateRoute';
import PublicRoute from '../../authentication/PublicRoute';

import Login from '../Login/Login'
import CreatePlanning from '../CreatePlanning/CreatePlanning'
import PlanningList from '../PlanningList/PlanningList'
import RefinePlanning from '../RefinePlanning/RefinePlanning'
import TrackingPlanning from '../TrackingPlanning/TrackingPlanning';
import Competitors from '../Competitors/Competitors';
import Suggestion from '../Suggestion/Suggestion';
import Audience from '../Audience/Audience';

import history from './history';

import './App.scss';

function App() {
  return (

    <Router history={history}>
      <Switch>
        <PublicRoute restricted={false} component={Login} path="/" exact />
        <PrivateRoute restricted={true} component={CreatePlanning} path="/createPlanning" exact />
        <PrivateRoute restricted={true} component={PlanningList} path="/planningList" exact />
        <PrivateRoute restricted={true} component={RefinePlanning} path="/refinePlanning" exact />
        <PrivateRoute restricted={true} component={TrackingPlanning} path="/tracking" exact />
        <PrivateRoute restricted={true} component={Competitors} path="/competitors" exact />
        <PrivateRoute restricted={true} component={Suggestion} path="/suggestion" exact />
        <PrivateRoute restricted={true} component={Audience} path="/audience" exact/> 
      </Switch>
    </Router>

  );
}
export default App;
