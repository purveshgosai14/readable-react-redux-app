import _ from 'lodash';
import {DeletePost, GetCategoryPost} from "../actions/Index";
import {GetPosts} from "../actions/Index";
import {GetPost} from "../actions/Index";

export default function(state={} , action) {
    switch(action.type) {
        case DeletePost:
            return _.omit(state, action.payload);
        case GetPosts:
            return _.mapKeys(action.payload.data, 'id');
        case GetPost:
            if(action.payload.data !== undefined) {
                return {...state, [action.payload.data.id]: action.payload.data}
            }
            break;
        case GetCategoryPost:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}