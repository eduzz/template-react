import axios from 'axios';
import { api } from './constants';

axios.interceptors.response.use(
    config => {
        return config;
    },
    error => {
        if(error.response.status === 401 || error.response.status === 500) {
            window.localStorage.removeItem('authToken');
            window.location.href = '/#/login';
        }

        return Promise.reject(error);
    }
);

export const get = (url, headers) => axios(
	{
		method: 'get',
		url: api + url,
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            ...headers,
		},
	}
);

export const post = (url, data, headers) => axios(
	{
		method: 'post',
		url: api + url,
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            ...headers,
		},
		data,
	}
);
