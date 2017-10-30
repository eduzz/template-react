import axios from 'axios';
import { api } from './constants';

import * as mock from './mock';

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

export const getMock = url => new Promise((res, rej) => res({data: mock[url]}));

export const postMock = url => new Promise((res, rej) => res({data: mock[url]}));