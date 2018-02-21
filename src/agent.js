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

export const get = (props) => axios({
    ...props,
    method: 'get',
    url: api + props.url,
});

export const post = (props) => axios({
    ...props,
    method: 'post',
    url: api + props.url,
});

export const put = (props) => axios({
    ...props,
    method: 'put',
    url: api + props.url,
});

export const del = (props) => axios({
    ...props,
    method: 'delete',
    url: api + props.url,
});
