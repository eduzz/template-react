import axios from 'axios';
import { api } from './constants';

export const get = url => axios(
	{
		method: 'get',
		url: api + url,
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
		},
	}
);

export const post = (url, data) => axios(
	{
		method: 'post',
		url: api + url,
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
		},
		data,
	}
);
