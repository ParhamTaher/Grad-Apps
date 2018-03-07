import { REQUEST_TICKET_ID } from '../actions';

export default function(state = {}, action) {
    switch (action.type) {
        case REQUEST_TICKET_ID:
            return action.payload;
        default:
            return state;
    }
}
