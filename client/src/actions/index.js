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
export const SAVE_NOTE = 'SAVE_NOTE';
export const REQUEST_APPLICANTS = 'REQUEST_APPLICANTS';

export function uploadDocumentRequest(file) {
    console.log('uploading GAPF... ' + file.name);
    return function(dispatch) {
        dispatch({
            type: UPLOAD_GAPF
        });
    };
}

export function requestTickets(facultyID, ticketType=null) {
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
                        notes:
                            'Bob - Please review tickets thanks. Admin - Bob, please send me GAPF Form'
                    },
                    {
                        TID: 2,
                        applicant: 'John',
                        ticketStatus: 'Granted',
                        ticket_type: 'I',
                        notes: ''
                    },
                    {
                        TID: 3,
                        applicant: 'Joh2n',
                        ticketStatus: 'Granted',
                        ticket_type: 'I',
                        notes: ''
                    }
                ]
            }
        });
    };
}

export function requestApplicants() {
    return dispatch => {
        dispatch({
            type: REQUEST_APPLICANTS,
            payload: {
                applicants: [
                    {
                        _id: 2435243,
                        fname: 'Parham',
                        lname: 'Taher'
                    },
                    {
                        _id: 666432,
                        fname: 'Bob',
                        lname: 'Bob'
                    },
                    {
                        _id: 4435635,
                        fname: 'John',
                        lname: 'Doe'
                    }
                ]
            }
        });
    };
}

export function offerRequest(iD) {
    return dispatch => {
        console.log('Inside offer request action creator! with ID: ' + iD);
    };
}

export function approveApplicant(tID) {
    console.log('Approving applicant with ID: ' + tID);
    return;
}

export function saveNote(values) {
    return dispatch => {
        console.log('Note Saved! ' + values.note);
    };
}

export function offerApplicant(tID) {
    return dispatch => {
        console.log('Offering applicant with ID: ' + tID);
    };
}

export function rejectApplicant(tID) {
    return dispatch => {
        console.log('Rejecting applicant with ID: ' + tID);
    };
}

export function acceptedOfferApplicant(tID) {
    return dispatch => {
        console.log('Accepted offer from applicant with ID: ' + tID);
    };
}

export function declinedOfferApplicant(tID) {
    return dispatch => {
        console.log('Declined offer from applicant with ID: ' + tID);
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
        if (credentials.email === 'AC@gmail.com') {
            dispatch(authUser({ userRole: 'AC' }));
        } else if (credentials.email === 'BD@gmail.com') {
            dispatch(authUser({ userRole: 'BD' }));
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
