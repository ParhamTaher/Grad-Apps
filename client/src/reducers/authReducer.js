// Reducer for all authentication procedures
//  This is where based on a specific action, the state of the program is updated. If a payload is given, the reducers
//  can update the state using the payload information and returns a new state.
/** For example:
    return {
        ...state,
        authenticated: true,
        error: null
    };
Means: Return a previous state, but also update the authenticated and error key value pairs. State is just an object with key, value pairs**/
//

import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from '../actions';

const initialState = {
    authenticated: true,
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authenticated: true,
                userRole: action.payload.userRole,
                error: null
            };
        case SIGN_OUT_USER:
            return {
                ...state,
                authenticated: false,
                error: null
            };
        case AUTH_ERROR:
            return {
                ...state,
                error: action.payload.message
            };
        default:
            return state;
    }
}
