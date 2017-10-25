import axios from 'axios';
import {URL, APIKEY} from '../config';
import * as ActionTypes from './Index';

export function getAllCategories() {
    const request = axios({
        method: 'get',
        url: `${URL}/categories`,
        headers: {'Authorization': APIKEY}
    });

    return {
        type: ActionTypes.GetCategories,
        payload: request
    }
}