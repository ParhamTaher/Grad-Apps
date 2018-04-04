// Combine Reducers
//  This is where all the reducers are combined and given aliases so they can be called from the pages of the web app.
//

import { combineReducers } from 'redux';
import ticketReducer from './ticketReducer';
import ticketReducerInitial from './ticketReducerInitial';
import ticketReducerOfferRequest from './ticketReducerOfferRequest';
import authReducer from './authReducer';
import applicantReducer from './applicantReducer';
import appNameReducer from './appNameReducer';

// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    form: FormReducer,
    tickets: ticketReducer,
    initialTickets: ticketReducerInitial,
    offerRequestTickets: ticketReducerOfferRequest,
    applicants: applicantReducer,
    appName: appNameReducer,
    router: routerReducer
});

export default rootReducer;
