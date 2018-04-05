import { REQUEST_OFFER_REQUEST_TICKETS } from '../actions';

export default function(state = { tickets: [] }, action) {
    // console.log('Inside offer-request reducer ' + action.payload);
    switch (action.type) {
        case REQUEST_OFFER_REQUEST_TICKETS:
            return action.payload;
        default:
            return state;
    }
}
