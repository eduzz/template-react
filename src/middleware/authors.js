import actions from 'actions';
import { get, post } from 'agent';

const authors = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_AUTHORS':
            get({url: '/authors'}).then(
                res => {
                    next(actions.receiveAuthors(res.data.data));
                },
                err => {
                    next(actions.receiveAuthorsError(err));
                }
            );
            break;
        case 'ADD_AUTHOR':
            post({url: '/authors', data: {...action}}).then(
                res => {
                    next(actions.receiveAuthor(res.data.data));
                },
                err => {
                    next(actions.receiveAuthorError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default authors;
