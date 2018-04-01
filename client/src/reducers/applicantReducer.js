import { REQUEST_APPLICANTS } from '../actions';

export default function(state = { applicants: [] }, action) {
    console.log(action.payload);
    switch (action.type) {
        case REQUEST_APPLICANTS:
            return action.payload;
        default:
            return state;
    }
}
