import React from 'react'
import { Route } from 'react-router-dom'; // route orchestrator
import { isLogin } from '../providers/authentication'
import Login from '../containers/Login/Login';

const PrivateRoute = ({ component: Component, routeParameters, key, ...rest }) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} routeParameters={routeParameters} key={key} />
                :
                <Login />
        )} />

    );
};

export default PrivateRoute;
