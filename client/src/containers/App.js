import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom';
import { history } from './../store/configureStore';
import { connect } from 'react-redux';

import Header from '../containers/Header';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import BDDashboard from '../containers/BDDashboard';
import FacultyDashboard from '../containers/FacultyDashboard';
import ACDashboard from '../containers/ACDashboard';
import BDDcreate from '../containers/BDDcreate';

// Passing through a component and checking whether our user is authenticated,
// then either returning the component we are passing in as an argument
// or redirecting them to the /login or /profile.
const PrivateRoute = ({
    component: Component,
    authenticated,
    userRole,
    ...props
}) => {
    return (
        <Route
            {...props}
            render={props =>
                authenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )}
        />
    );
};

const PublicRoute = ({
    component: Component,
    authenticated,
    userRole,
    ...props
}) => {
    return (
        <Route
            {...props}
            render={props =>
                authenticated === true && userRole === 'FSS' ? (
                    <Redirect to="/FacultyDashboard" />
                ) : authenticated === true && userRole === 'BD' ? (
                    <Redirect to="/BDDashboard" />
                ) : authenticated === true && userRole === 'AC' ? (
                    <Redirect to="/ACDashboard" />
                ) : authenticated === true && userRole === 'BD' ? (
                    <Redirect to="/BDDashboard" />
                ) : (
                    <Component {...props} />
                )}
        />
    );
};

class App extends React.Component {
    // Header rendered in every view
    render() {
        return (
            <ConnectedRouter history={history}>
                <div>
                    <Header />

                    <div className="container">
                        <Route exact path="/">
                            <Redirect to="/ACDashboard" />
                        </Route>
                        <PublicRoute
                            authenticated={this.props.authenticated}
                            path="/signup"
                            component={Signup}
                        />
                        <PublicRoute
                            authenticated={this.props.authenticated}
                            userRole={this.props.userRole}
                            path="/login"
                            component={Login}
                        />
                        <PrivateRoute
                            authenticated={this.props.authenticated}
                            userRole={this.props.userRole}
                            path="/BDDashboard"
                            component={BDDashboard}
                        />
                        <PrivateRoute
                            authenticated={this.props.authenticated}
                            userRole={this.props.userRole}
                            path="/createTicket"
                            component={BDDcreate}
                        />
                        <PrivateRoute
                            authenticated={this.props.authenticated}
                            userRole={this.props.userRole}
                            path="/FacultyDashboard"
                            component={FacultyDashboard}
                        />
                        <PrivateRoute
                            authenticated={this.props.authenticated}
                            userRole={this.props.userRole}
                            path="/ACDashboard"
                            component={ACDashboard}
                        />
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = state => {
    console.log('user role: ', state.auth.userRole);
    return {
        authenticated: state.auth.authenticated,
        userRole: state.auth.userRole
    };
};

export default connect(mapStateToProps)(App);
