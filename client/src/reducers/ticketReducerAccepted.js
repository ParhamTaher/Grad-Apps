import { REQUEST_ACCEPTED_TICKETS } from '../actions';

export default function(state = { tickets: [] }, action) {
    // console.log('Inside initial reducer ' + action.payload);
    switch (action.type) {
        case REQUEST_ACCEPTED_TICKETS:
            return action.payload;
        default:
            return state;
    }
}
