import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { GarageScreen } from '../components/garage/GarageScreen';
import { MaintenanceReport } from '../components/garage/maintenances-report/MaintenanceReport';
import { Loader } from '../components/ui/Loader';
import { startChecking } from '../redux/actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch( startChecking() );
    }, [ dispatch ]);

    if ( checking ) {
        return ( <Loader /> );
    }

    return (
        <Router>
            <Switch>
                <PublicRoute exact path="/login" component={ LoginScreen } isAuthenticated={ !!uid } />
                <PrivateRoute exact path="/" component={ GarageScreen } isAuthenticated={ !!uid } />
                <PrivateRoute exact path="/maintenance-report" component={ MaintenanceReport } isAuthenticated={ !!uid } />

                <Redirect to="/" />
            </Switch>
        </Router>
    )
}
