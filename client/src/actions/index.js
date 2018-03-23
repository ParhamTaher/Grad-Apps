// ACTIONS
//  This is where the ajax calls are made to the backend. An action dispatches data or requests data, where the data is inside 'payload'.
//  When dispatched, the requeted action is then processed by the reducers.
/**
    {
        type: DESIRED ACTION
        payload: DATA THE FRONT END WANTS TO SEND
    }
**/
//
import axios from 'axios';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const REQUEST_CHANGE_PASS = 'REQUEST_CHANGE_PASS';
export const REQUEST_TICKETS = 'REQUEST_TICKET_ID';
export const UPLOAD_GAPF = 'UPLOAD_GAPF';
export const SAVE_NOTE_RESPONSE = 'SAVE_NOTE_RESPONSE';

export function uploadDocumentRequest(file) {
    console.log('uploading GAPF... ' + file.name);
    return function(dispatch) {
        dispatch({
            type: UPLOAD_GAPF
        });
    };
}

export function requestTickets(facultyID, ticketType) {
    return dispatch => {
        axios.get('/tickets').then(function(response) {
            console.log(
                'Successfully connected to tickets route!: ',
                response.data
            );
        });

        dispatch({
            type: REQUEST_TICKETS,
            payload: {
                tickets: [
                    {
                        TID: 1,
                        applicant: 'Bob',
                        ticketStatus: 'Granted',
                        ticket_type: 'D',
                        notes: 'Ticket notes'
                    },
                    {
                        TID: 2,
                        applicant: 'John',
                        ticketStatus: 'Granted',
                        ticket_type: 'I',
                        notes: 'Ticket notes'
                    }
                ]
            }
        });
    };
}

export function approveApplicant(tID) {
    console.log("Approving applicant with ID: " + tID);
    return;
}

// Auth Data
export function signUpUser(credentials) {
    return function(dispatch) {
        dispatch(authUser());
    };
}

export function signInUser(credentials) {
    return function(dispatch) {
        if (credentials.email === 'AC@gmail.com') {
            dispatch(authUser({ userRole: 'AC' }));
        } else {
            dispatch(authUser({ userRole: 'FSS' }));
        }
        // Check db for the userRole of this user (BD, FSS, Chair, etc)
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
export function authUser(userRole) {
    return {
        type: AUTH_USER,
        payload: userRole
    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}
