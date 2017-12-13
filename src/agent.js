import axios from 'axios';
import { api } from './constants';
import { getStore } from './store';
import actions from 'actions';

axios.interceptors.response.use(
    config => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('authToken')}`;

        return config;
    },
    error => {
        if(error.response.status === 401)
            getStore().dispatch(actions.logout());

        return Promise.reject(error);
    }
);

export const get = (url, headers) => axios({
	method: 'get',
	url: api + url,
	headers,
});

export const post = (url, data, headers) => axios({
	method: 'post',
	url: api + url,
	headers,
	data,
});
