import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email.';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Please enter a password.';
    }

    return errors;
};

class Login extends React.Component {
    handleFormSubmit = values => {
        // console.log('Login Info:', values);
        this.props.signInUser(values.email, values.password);
    };

    renderField = ({ input, label, type, meta: { touched, error } }) => (
        <fieldset
            className={`form-group ${touched && error ? 'has-error' : ''}`}
        >
            <label className="control-label">{label}</label>
            <div>
                <input
                    {...input}
                    placeholder={label}
                    className="form-control"
                    type={type}
                />
                {touched && error && <div className="help-block">{error}</div>}
            </div>
        </fieldset>
    );

    renderAuthenticationError() {
        if (this.props.authenticationError) {
            return (
                <div className="alert alert-danger">
                    {this.props.authenticationError}
                </div>
            );
        } else {
            return <div />;
        }
    }

    // handleSubmit() is a redux-form method, made available via this.props by reduxForm()(),
    // that we can attach to the form's onSubmit event handler.
    render() {
        return (
            <div className="container">
                <div className="col-md-6 col-md-offset-3">
                    <h2 className="text-center">Log In</h2>

                    {this.renderAuthenticationError()}

                    <form
                        onSubmit={this.props.handleSubmit(
                            this.handleFormSubmit
                        )}
                    >
                        <Field
                            name="email"
                            component={this.renderField}
                            className="form-control"
                            type="text"
                            label="Email"
                        />
                        <Field
                            name="password"
                            component={this.renderField}
                            className="form-control"
                            type="password"
                            label="Password"
                        />
                        <button action="submit" className="btn btn-primary">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticationError: state.auth.error
    };
}

//
// Map the global state and serve them as 'props', so the data can be used in the components.
//

// bindActionCreators actually only needs to be used when you're passing action creators down as props from
// a container to a component that's not aware of Redux.

// passed to FormReducer
export default connect(mapStateToProps, Actions)(
    reduxForm({
        form: 'login',
        validate
    })(Login)
);
