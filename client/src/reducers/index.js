// Combine Reducers
//  This is where all the reducers are combined and given aliases so they can be called from the pages of the web app.
//

import { combineReducers } from 'redux';
import ticketReducer from './ticketReducer';
import authReducer from './authReducer';
import applicantReducer from './applicantReducer';

// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    form: FormReducer,
    tickets: ticketReducer,
    applicants: applicantReducer,
    router: routerReducer
});

export default rootReducer;
