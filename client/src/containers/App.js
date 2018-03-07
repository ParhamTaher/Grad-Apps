import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom';
import { history } from './../store/configureStore';
import { connect } from 'react-redux';

import Header from '../containers/Header';
import Signup from '../containers/Signup';
import Login from '../containers/Login';
import BDDashboard from '../containers/BDDashboard';

// Passing through a component and checking whether our user is authenticated,
// then either returning the component we are passing in as an argument
// or redirecting them to the /login or /profile.
const PrivateRoute = ({ component: Component, authenticated, ...props }) => {
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

const PublicRoute = ({ component: Component, authenticated, ...props }) => {
    return (
        <Route
            {...props}
            render={props =>
                authenticated === false ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
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
                            <Redirect to="/login" />
                        </Route>
                        <PublicRoute
                            authenticated={this.props.authenticated}
                            path="/signup"
                            component={Signup}
                        />
                        <PublicRoute
                            authenticated={this.props.authenticated}
                            path="/login"
                            component={Login}
                        />
                        <PrivateRoute
                            authenticated={this.props.authenticated}
                            path="/BDDashboard"
                            component={BDDashboard}
                        />
                    </div>
                </div>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = state => {
    return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(App);
