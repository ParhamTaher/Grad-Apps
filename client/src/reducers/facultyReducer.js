import { REQUEST_ALL_FACULTY } from '../actions';

export default function(state = { faculty: [] }, action) {
    switch (action.type) {
        case REQUEST_ALL_FACULTY:
            return action.payload;
        default:
            return state;
    }
}
