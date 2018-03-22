import { REQUEST_TICKETS, SAVE_NOTE_RESPONSE } from '../actions';

export default function(state = { tickets: [] }, action) {
    console.log('Inside ticket reducer: ', action.payload);
    switch (action.type) {
        case REQUEST_TICKETS:
            return action.payload;
        case SAVE_NOTE_RESPONSE:
        	return action.payload;
        default:
            return state;
    }
}
