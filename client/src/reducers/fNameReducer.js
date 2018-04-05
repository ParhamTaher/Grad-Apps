import { REQUEST_FACULTY_NAME_FROM_ID } from '../actions';

export default function(state = { fName: 'No One' }, action) {
    console.log("fname payload: " + action.payload);
    switch (action.type) {
        case REQUEST_FACULTY_NAME_FROM_ID:
            return action.payload;
        default:
            return state;
    }
}
