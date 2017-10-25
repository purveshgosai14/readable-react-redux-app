import { GetComments, DeleteComment } from "../actions/Index";
import _ from 'lodash';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case DeleteComment:
            return _.omit(state, action.payload);
        case GetComments:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}