export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const REQUEST_CHANGE_PASS = 'REQUEST_CHANGE_PASS';
export const REQUEST_TICKET_ID = 'REQUEST_TICKET_ID';

export function requestTicketID() {
    return dispatch => {
        dispatch({
            type: REQUEST_TICKET_ID,
            payload: { ticketID: 123 }
        });
    };
}

// Auth Data
export function signUpUser(credentials) {
    return function(dispatch) {
        dispatch(authUser());
    };
}

export function signInUser(credentials) {
    return function(dispatch) {
        return function(dispatch) {
            dispatch(authUser());
        };
    };
}

export function signOutUser() {
    return function(dispatch) {
        dispatch({
            type: SIGN_OUT_USER
        });
    };
}

// If user is signed in, Firebase.auth.onAuthStateChanged()
// will return a valid user object, and dispatch to authUser()
// action creator to update authenticated to true on state. Returns null otherwise
export function verifyAuth() {
    return function(dispatch) {
        dispatch(authUser());
    };
}
/**
export function requestPasswordChange(credentials) {
    return function(dispatch) {
        var user = firebase.auth().currentUser;

        user
            .updatePassword(credentials.passwordConfirmation)
            .then(response => {
                dispatch({
                    type: REQUEST_CHANGE_PASS,
                    payload: { message: 'Success!' }
                });
            })
            .catch(error => {
                dispatch({
                    type: REQUEST_CHANGE_PASS,
                    payload: error
                });
            });
    };
}
**/

// Dual-purpose action used for both signin and signup
export function authUser() {
    return {
        type: AUTH_USER
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}