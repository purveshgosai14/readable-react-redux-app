import axios from 'axios';
import {URL, APIKEY} from '../config';
import * as ActionTypes from './Index';


export function upVote(id, callback) {
    const request = axios({
        method: 'post',
        url: `${URL}/posts/${id}`,
        headers:{'Authorization': APIKEY},
        data: {
            option: "upVote"
        }
    })
        .then(() => callback());

    return {
        type:ActionTypes.UpVote,
        payload: request
    }
}

export function downVote(id, callback) {
    const request = axios({
        method: 'post',
        url: `${URL}/posts/${id}`,
        headers:{'Authorization': APIKEY},
        data: {
            option: "downVote"
        }
    })
        .then(() => callback());

    return {
        type:ActionTypes.DownVote,
        payload: request
    }
}