import { REQUEST_TICKETS } from '../actions';

export default function(state = { tickets: [] }, action) {
    console.log('Inside ticket reducer: ', action.payload);
    switch (action.type) {
        case REQUEST_TICKETS:
            return action.payload;
        default:
            return state;
    }
}
