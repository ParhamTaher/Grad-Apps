// Combine Reducers
//  This is where all the reducers are combined and given aliases so they can be called from the pages of the web app.
//

import { combineReducers } from 'redux';
import ticketReducer from './ticketReducer';
import ticketReducerInitial from './ticketReducerInitial';
import ticketReducerGranted from './ticketReducerGranted';
import ticketReducerOfferRequest from './ticketReducerOfferRequest';
import ticketReducerOfferPending from './ticketReducerOfferPending';
import ticketReducerAccepted from './ticketReducerAccepted';
import ticketReducerRefused from './ticketReducerRefused';
import authReducer from './authReducer';
import applicantReducer from './applicantReducer';
import appNameReducer from './appNameReducer';
import facultyReducer from './facultyReducer';

// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    form: FormReducer,
    tickets: ticketReducer,
    initialTickets: ticketReducerInitial,
    grantedTickets: ticketReducerGranted,
    offerRequestTickets: ticketReducerOfferRequest,
    offerPendingTickets: ticketReducerOfferPending,
    acceptedTickets: ticketReducerAccepted,
    refusedTickets: ticketReducerRefused,
    applicants: applicantReducer,
    appName: appNameReducer,
    router: routerReducer,
    faculty: facultyReducer
});

export default rootReducer;
