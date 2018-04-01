import { REQUEST_TICKETS } from '../actions';

export default function(state = { tickets: [] }, action) {
    switch (action.type) {
        case REQUEST_TICKETS:
            return action.payload;
        default:
            return state;
    }
}
