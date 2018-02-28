import axios from 'axios';
import { api } from './constants';
import { getStore } from './store';
import actions from 'actions';

axios.interceptors.request.use(
    function (config) {
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        };
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
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

export const put = (url, data, headers) => axios({
	method: 'put',
	url: api + url,
	headers,
	data,
});

export const del = (url, headers) => axios({
	method: 'delete',
	url: api + url,
	headers,
});
