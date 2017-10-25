import axios from 'axios';
import {URL, APIKEY} from '../config';
import * as ActionTypes from './Index';

export function getPosts() {
    const request = axios({
        method: 'get',
        url: `${URL}/posts`,
        headers: {'Authorization': APIKEY}
    });

    return {
        type:ActionTypes.GetPosts,
        payload: request
    }
}


export function createPost(values, callback) {
    const request = axios({
        method: 'post',
        url: `${URL}/posts`,
        headers: {'Authorization': APIKEY},
        data: values
    })
        .then(() => callback());

    return {
        type:ActionTypes.CreatePost,
        payload: request
    }
}

export function editPost(id, values, callback) {
    const request = axios({
        method: 'put',
        url: `${URL}/posts/${id}`,
        headers: {'Authorization': APIKEY},
        data: values
    })
        .then(() => callback());

    return {
        type:ActionTypes.EditPost,
        payload: request
    }
}

export function deletePost(id, callback) {
    axios({
        method: 'delete',
        url: `${URL}/posts/${id}`,
        headers: {'Authorization': APIKEY}
    })
        .then(()=>callback());

    return {
        type:ActionTypes.DeletePost,
        payload: id
    }
}

export function getPost(id) {
    const request = axios({
        method: 'get',
        url: `${URL}/posts/${id}`,
        headers: {'Authorization': APIKEY}
    });

    return {
        type:ActionTypes.GetPost,
        payload: request
    }
}

export function getCategoryPost(category) {
    const request = axios({
        method: 'get',
        url: `${URL}/${category}/posts`,
        headers: {'Authorization': APIKEY}
    });

    return {
        type:ActionTypes.GetCategoryPost,
        payload: request
    }
}