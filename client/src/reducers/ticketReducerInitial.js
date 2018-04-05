import { REQUEST_INITIAL_TICKETS } from '../actions';

export default function(state = { tickets: [] }, action) {
    // console.log('Inside initial reducer ' + action.payload);
    switch (action.type) {
        case REQUEST_INITIAL_TICKETS:
            return action.payload;
        default:
            return state;
    }
}
