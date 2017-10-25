import _ from 'lodash';
import {DeletePost, GetCategoryPost} from "../actions/Index";
import {GetPosts} from "../actions/Index";
import {GetPost} from "../actions/Index";

const initialState = {};

export default function(state = initialState, action) {
    switch(action.type) {
        case DeletePost:
            return _.omit(state, action.payload);
        case GetPosts:
            return _.mapKeys(action.payload.data, 'id');
        case GetPost:
            return { ...state, [action.payload.data.id]: action.payload.data};
        case GetCategoryPost:
            console.log(action.payload.data)
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}