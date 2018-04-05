import { REQUEST_OFFER_PENDING_TICKETS } from '../actions';

export default function(state = { tickets: [] }, action) {
    console.log('Inside offer-pending reducer ' + action.payload);
    switch (action.type) {
        case REQUEST_OFFER_PENDING_TICKETS:
            return action.payload;
        default:
            return state;
    }
}
