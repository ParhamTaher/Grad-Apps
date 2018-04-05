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
// import cookie from 'react-cookie';

export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const REQUEST_CHANGE_PASS = 'REQUEST_CHANGE_PASS';
export const REQUEST_TICKETS = 'REQUEST_TICKET_ID';
export const REQUEST_INITIAL_TICKETS = 'REQUEST_INITIAL_TICKETS';
export const REQUEST_OFFER_REQUEST_TICKETS = 'REQUEST_OFFER_REQUEST_TICKETS';
export const REQUEST_OFFER_PENDING_TICKETS = 'REQUEST_OFFER_PENDING_TICKETS';
export const REQUEST_GRANTED_TICKETS = 'REQUEST_GRANTED_TICKETS';
export const REQUEST_REFUSED_TICKETS = 'REQUEST_REFUSED_TICKETS';
export const REQUEST_ACCEPTED_TICKETS = 'REQUEST_ACCEPTED_TICKETS';
export const UPLOAD_GAPF = 'UPLOAD_GAPF';
export const SAVE_NOTE = 'SAVE_NOTE';
export const REQUEST_APPLICANTS = 'REQUEST_APPLICANTS';
export const REQUEST_APP_NAME = 'REQUEST_APP_NAME';
export const REQUEST_FACULTY_NAME_FROM_ID = 'REQUEST_FACULTY_NAME_FROM_ID';
export const REQUEST_APPLICANT_NAME_FROM_ID = 'REQUEST_APPLICANT_NAME_FROM_ID';
export const REQUEST_ALL_FACULTY = 'REQUEST_ALL_FACULTY';
export const CREATE_TICKET = 'CREATE_TICKET';

export function uploadDocumentRequest(file) {
    console.log('uploading GAPF... ' + file.name);
    return dispatch => {
        axios.post('/gapf', { file }).then(function(response) {
            console.log("Successfully uploaded GAPF Form");
        });
    }
}


export function requestTickets(
    facultyID = '',
    ticketStatus = '',
    ticketType = ''
) {
    let andToken1 = '';
    let andToken2 = '';
    if (
        (facultyID != '' && ticketStatus != '') ||
        (facultyID != '' && ticketType != '') ||
        (ticketStatus != '' && ticketType != '')
    ) {
        andToken1 = '&';
        if (facultyID != '' && ticketStatus != '' && ticketType != '') {
            andToken2 = '&';
        }
    }

    let facultyIdUrl = facultyID == '' ? '' : 'faculty_id=' + facultyID;
    let ticketStatusUrl = ticketStatus == '' ? '' : 'status=' + ticketStatus;
    let ticketTypeUrl = ticketType == '' ? '' : 'ticket_type=' + ticketType;

    console.log(
        'URL: ' +
            '/tickets?' +
            facultyIdUrl +
            andToken1 +
            ticketStatusUrl +
            andToken2 +
            ticketTypeUrl
    );
    return dispatch => {
        axios
            .get(
                '/tickets?' +
                    facultyIdUrl +
                    andToken1 +
                    ticketStatusUrl +
                    andToken2 +
                    ticketTypeUrl
            )
            .then(function(response) {
                console.log(
                    'Successfully connected to tickets route!: ',
                    response.data
                );
                dispatch({
                    type: REQUEST_TICKETS,
                    payload: response.data
                });
            });
    };
}

export function requestTicketsNew(
    facultyID = '',
    ticketStatus = '',
    ticketType = ''
) {
    let andToken1 = '';
    let andToken2 = '';
    if (
        (facultyID != '' && ticketStatus != '') ||
        (facultyID != '' && ticketType != '') ||
        (ticketStatus != '' && ticketType != '')
    ) {
        andToken1 = '&';
        if (facultyID != '' && ticketStatus != '' && ticketType != '') {
            andToken2 = '&';
        }
    }

    let facultyIdUrl = facultyID == '' ? '' : 'faculty_id=' + facultyID;
    let ticketStatusUrl = ticketStatus == '' ? '' : 'status=' + ticketStatus;
    let ticketTypeUrl = ticketType == '' ? '' : 'ticket_type=' + ticketType;

    console.log(
        'URL: ' +
            '/tickets?' +
            facultyIdUrl +
            andToken1 +
            ticketStatusUrl +
            andToken2 +
            ticketTypeUrl
    );
    return dispatch => {
        axios
            .get(
                '/tickets?' +
                    facultyIdUrl +
                    andToken1 +
                    ticketStatusUrl +
                    andToken2 +
                    ticketTypeUrl
            )
            .then(function(response) {
                console.log(
                    'Successfully connected to FSS tickets route!: ',
                    response.data
                );
                if (ticketStatus == 'initial') {
                    dispatch({
                        type: REQUEST_INITIAL_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'granted') {
                    dispatch({
                        type: REQUEST_GRANTED_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'offer-request') {
                    dispatch({
                        type: REQUEST_OFFER_REQUEST_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'offer-pending') {
                    dispatch({
                        type: REQUEST_OFFER_PENDING_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'accepted') {
                    dispatch({
                        type: REQUEST_ACCEPTED_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'refused') {
                    dispatch({
                        type: REQUEST_REFUSED_TICKETS,
                        payload: response.data
                    });
                } else {
                    dispatch({
                        type: REQUEST_TICKETS,
                        payload: response.data
                    });
                }
            });
    };
}

export function requestTicketsAC(
    facultyID = '',
    ticketStatus = '',
    ticketType = ''
) {
    let andToken1 = '';
    let andToken2 = '';
    if (
        (facultyID != '' && ticketStatus != '') ||
        (facultyID != '' && ticketType != '') ||
        (ticketStatus != '' && ticketType != '')
    ) {
        andToken1 = '&';
        if (facultyID != '' && ticketStatus != '' && ticketType != '') {
            andToken2 = '&';
        }
    }

    let facultyIdUrl = facultyID == '' ? '' : 'faculty_id=' + facultyID;
    let ticketStatusUrl = ticketStatus == '' ? '' : 'status=' + ticketStatus;
    let ticketTypeUrl = ticketType == '' ? '' : 'ticket_type=' + ticketType;

    console.log(
        'URL: ' +
            '/tickets?' +
            facultyIdUrl +
            andToken1 +
            ticketStatusUrl +
            andToken2 +
            ticketTypeUrl
    );
    return dispatch => {
        axios
            .get(
                '/tickets?' +
                    facultyIdUrl +
                    andToken1 +
                    ticketStatusUrl +
                    andToken2 +
                    ticketTypeUrl
            )
            .then(function(response) {
                console.log(
                    'Successfully connected to AC tickets route!: ',
                    response.data
                );
                if (ticketStatus == 'offer-request') {
                    dispatch({
                        type: REQUEST_OFFER_REQUEST_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'offer-pending') {
                    dispatch({
                        type: REQUEST_OFFER_PENDING_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'accepted') {
                    dispatch({
                        type: REQUEST_ACCEPTED_TICKETS,
                        payload: response.data
                    });
                } else if (ticketStatus == 'refused') {
                    dispatch({
                        type: REQUEST_REFUSED_TICKETS,
                        payload: response.data
                    });
                } else {
                    dispatch({
                        type: REQUEST_TICKETS,
                        payload: response.data
                    });
                }
            });
    };
}

export function requestTicketsBD(
    ticketType = ''
) {

    let ticketTypeUrl = ticketType == '' ? '' : 'ticket_type=' + ticketType;
    console.log("HERE");
    return dispatch => {
        axios
            .get(
                '/tickets?'+
                ticketTypeUrl
            )
            .then(function(response) {
                console.log(
                    'Successfully connected to tickets route!: ',
                    response.data
                );
                dispatch({
                    type: REQUEST_TICKETS,
                    payload: response.data
                });
            });
    };
}


export function requestApplicants() {
    return dispatch => {
        axios.get('/applicants').then(function(response) {
            dispatch({
                type: REQUEST_APPLICANTS,
                payload: response.data
            });
        });

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

export function getApplicantNameFromId(aID) {
    return dispatch => {
        console.log("getting applicant name with id... " + aID);
        axios.get('/applicants/' + aID).then(function(response) {
            console.log('applicant name: ' + response.data.applicant);
            dispatch({
                type: REQUEST_APPLICANT_NAME_FROM_ID,
                payload: {
                    appName: response.data.applicant.fname + ' ' + response.data.applicant.lname
                }
            })
        });
    };
}

export function getAllFaculty() {
    return dispatch => {
        console.log("getting all faculty... ");
        axios.get('/faculty/').then(function(response) {
            console.log('faculty: ' + response.data);
            dispatch({
                type: REQUEST_ALL_FACULTY,
                payload: response.data
            });
        });
    };
}

export function getFacultyNameFromId(iD) {
    return dispatch => {
        console.log("getting faculty name with id... " + iD);
        axios.get('/faculty?facultyId=' + iD).then(function(response) {
            console.log('faculty name: ' + response.data.faculty.fname);
            dispatch({
                type: REQUEST_FACULTY_NAME_FROM_ID,
                payload: {
                    fName: response.data.faculty.fname + ' ' + response.data.faculty.lname
                }
            });

        });
    };
}

export function offerRequest(tID, aID) {
    return dispatch => {
        console.log(
            'Inside offer request action creator! with TID: ' + tID + ' and AID: ' + aID
        );
        if (aID != null) {
            axios
                .patch('/tickets/' + tID, [
                    { "fieldName": "applicant_id", "value": aID.toString() },
                    { "fieldName": "status", "value": "offer-request" }
                ])
                .then(response => {
                    console.log(
                        'Successfully offered applicant, ticket is pending acceptence'
                    );
                })
                .catch(error => {
                    console.log('ERROR in offerRequest ' + error);
                });
        }
    };
}

export function approveApplicant(tID) {
    console.log('Approving applicant with ID: ' + tID);
    return;
}

export function saveNote(tID, values, notesList) {
    return dispatch => {
        axios
            .patch('/tickets/' + tID, [
                {"fieldName": "note", "value": values}
            ])
            .then(response => {
                console.log('Successfully saved a note!: ' + values.note);
            })
            .catch(error => {
                console.log('ERROR in saveNote ' + error);
            });
    };
}

export function offerApplicant(tID) {
    return dispatch => {
        console.log('Offering applicant with ID: ' + tID);
        if (tID != null) {
            axios
                .patch("/tickets/" + tID, [
                    { "fieldName": "status", "value": "offer-pending" }
                ])
                .then(response => {
                    console.log("Successfully offered applicant, ticket is pending acceptence");
                })
                .catch(error => {
                    console.log("ERROR in offerApplicant " + error);
                });
        }
    };
}

export function rejectApplicant(tID, fID, type) {
    return dispatch => {
        console.log('Rejecting applicant with ID: ' + tID);
        if (tID != null && fID != null) {
            axios
                .patch("/tickets/" + tID, [
                    { "fieldName": "status", "value": "refused" }
                ])
                .then(response => {
                    console.log("Applicant rejected");
                })
                .catch(error => {
                    console.log("ERROR in rejectApplicant " + error);
                });
            axios
                .post("/tickets",
                {
                    "faculty_id": fID,
                    "ticket_type": type,
                    "status": "granted"
                })
                .then(response => {
                    console.log("New ticket granted for " + fID);
                })
                .catch(error => {
                    console.log("ERROR in creating new ticket after rejecting: " + error);
                });
        }
    };
}

export function acceptedOfferApplicant(tID) {
    return dispatch => {
        console.log('Applicant accepting offer with ID: ' + tID);
        if (tID != null) {
            axios
                .patch("/tickets/" + tID, [
                    { "fieldName": "status", "value": "accepted" }
                ])
                .then(response => {
                    console.log("Applicant accepted offer.");
                })
                .catch(error => {
                    console.log("ERROR in acceptedOfferApplicant " + error);
                });
        }
    };

}

export function declinedOfferApplicant(tID, fID, type) {
    return dispatch => {
        console.log('Applicant declined offer with ID: ' + tID);
        if (tID != null && fID != null) {
            axios
                .patch("/tickets/" + tID, [
                    { "fieldName": "status", "value": "refused" }
                ])
                .then(response => {
                    console.log("Applicant declined offer.");
                })
                .catch(error => {
                    console.log("ERROR in declinedOfferApplicant " + error);
                });
            axios
                .post("/tickets",
                {
                    "faculty_id": fID,
                    "ticket_type": type,
                    "status": "granted"
                })
                .then(response => {
                    console.log("New ticket granted for " + fID);
                })
                .catch(error => {
                    console.log("ERROR in creating new ticket after refusal: " + error);
                });
        }
    };

}
// Create Ticket
export function createTicket(faculty_id, ticket_type, status, quantity) {
    let ticketNum = '';
    if(quantity > 1){
        ticketNum = '/'+quantity;
    }
    return dispatch => {
        axios
            .post("/tickets"+ticketNum,
                {
                    "faculty_id": faculty_id,
                    "ticket_type": ticket_type,
                    "status": status
                })
                .then(response => {
                    console.log("New ticket granted for " + faculty_id);
                })
                .catch(error => {
                    console.log("ERROR in creating new ticket after rejecting: " + error);
});
    };
}
//change status to granted
export function grantTicket(tID) {
    return dispatch => {
        console.log('Granting ticket with ID: ' + tID);
        if (tID != null) {
            axios
                .patch("/tickets/" + tID, [
                    { "fieldName": "status", "value": "granted" }
                ])
                .then(response => {
                    console.log("Ticket has been granted");
                })
                .catch(error => {
                    console.log("ERROR in grantTicket " + error);
                });
        }
    };

}
// Auth Data
export function signUpUser(fname, lname, email, password) {
    return dispatch => {
        axios
            .post('/users/signup', { fname, lname, email, password })
            .then(response => {
                dispatch(authUser({ userRole: 'FSS' }));
            })
            .catch(error => {
                console.log('inside action signup: ', error);
                dispatch(authError(error));
            });
    };
}

export function signInUser(email, password) {
    return dispatch => {
        axios
            .post('/users/login', { email, password })
            .then(response => {
                console.log('Login Response: ' + response.userId);
                if (email === 'ac0@mail.ca') {
                    dispatch(authUser({ userRole: 'AC' }));
                } else if (email === 'bd0@mail.ca') {
                    dispatch(authUser({ userRole: 'BD' }));
                } else {
                    // cookie.set('session', 'FSS');
                    dispatch(authUser({ userRole: 'FSS' }));
                }
            })
            .catch(error => {
                console.log('inside action signin: ', error);
                dispatch(authError(error));
            });
    };
}

export function signOutUser() {
    return function(dispatch) {
        // cookie.remove('session');
        dispatch({
            type: SIGN_OUT_USER
        });
    };
}

// If user is signed in,
// will return a valid user object, and dispatch to authUser()
// action creator to update authenticated to true on state. Returns null otherwise
export function verifyAuth() {
    return function(dispatch) {
        dispatch(authUser({ userRole: null }));
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
