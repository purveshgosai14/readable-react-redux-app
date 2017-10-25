import axios from 'axios';
import {URL, APIKEY} from '../config';
import * as ActionTypes from './Index';

export function getComments(id, callback) {
    const request = axios({
        method: 'get',
        url: `${URL}/posts/${id}/comments`,
        headers: {'Authorization': APIKEY}
    });
    return {
        type: ActionTypes.GetComments,
        payload: request
    }
}

export function editComment(id, values, callback) {
    const request = axios({
        method: 'put',
        url: `${URL}/comments/${id}`,
        headers: {'Authorization': APIKEY},
        data: values
    })
        .then(() => callback());

    return {
        type: ActionTypes.EditComment,
        payload: request
    }
}

export function upVoteComment(id, callback) {
    const request = axios({
        method: 'post',
        url: `${URL}/comments/${id}`,
        headers: {'Authorization': APIKEY},
        data: {
            option: "upVote"
        }
    })
        .then(() => callback());

    return {
        type: ActionTypes.UpVoteComment,
        payload: request
    }
}

export function downVoteComment(id, callback) {
    const request = axios({
        method: 'post',
        url: `${URL}/comments/${id}`,
        headers: {'Authorization': APIKEY},
        data: {
            option: "downVote"
        }
    })
        .then(() => callback());

    return {
        type: ActionTypes.DownVoteComment,
        payload: request
    }
}

export function createComment(values, callback) {
    const request = axios({
        method: 'post',
        url: `${URL}/comments`,
        headers: {'Authorization': APIKEY},
        data: values
    })
        .then(() => { callback(); console.log("success")});
    console.log(request)
    return {
        type: ActionTypes.CreateComment,
        payload: request
    }
}

export function deleteComment(id, callback) {
    axios({
        method: 'delete',
        url: `${URL}/comments/${id}`,
        headers: {'Authorization': APIKEY}
    })
        .then(()=>callback());
    return {
        type: ActionTypes.DeleteComment,
        payload: id
    }
}
