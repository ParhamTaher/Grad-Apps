import { REQUEST_ALL_FILES_GAPF } from '../actions';

export default function(state = { gapf: [] }, action) {
    switch (action.type) {
        case REQUEST_ALL_FILES_GAPF:
            return action.payload;
        default:
            return state;
    }
}
