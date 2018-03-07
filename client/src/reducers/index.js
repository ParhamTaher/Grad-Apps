import { combineReducers } from 'redux';
import ticketReducer from './ticketReducer';
import authReducer from './authReducer';

// Keep track of our current location, in the store
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
    auth: authReducer,
    form: FormReducer,
    ticket: ticketReducer,
    router: routerReducer
});

export default rootReducer;
