import { REQUEST_APPLICANT_NAME_FROM_ID } from '../actions';

export default function(state = { appName: 'No One' }, action) {
    console.log("appname payload: " + action.payload);
    switch (action.type) {
        case REQUEST_APPLICANT_NAME_FROM_ID:
            return action.payload;
        default:
            return state;
    }
}
