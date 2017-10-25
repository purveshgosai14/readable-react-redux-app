import { GetCategories } from "../actions/Index";
import _ from 'lodash';

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case GetCategories:
            return _.mapKeys(action.payload.data.categories, 'name');
        default:
            return state;
    }
}