import { REQUEST_REFUSED_TICKETS } from '../actions';

export default function(state = { tickets: [] }, action) {
    console.log('Inside initial reducer ' + action.payload);
    switch (action.type) {
        case REQUEST_REFUSED_TICKETS:
            return action.payload;
        default:
            return state;
    }
}
