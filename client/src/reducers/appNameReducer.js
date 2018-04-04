import { REQUEST_APP_NAME } from '../actions';

export default function(state = { tickets: [] }, action) {
    switch (action.type) {
        case REQUEST_APP_NAME:
            return action.payload;
        default:
            return state;
    }
}
