import actions from 'actions';
import { get } from 'agent';

const categories = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_CATEGORIES':
            get('/categories').then(
                res => {
                    next(actions.receiveCategories(res.data.data));
                },
                err => {
                    next(actions.receiveCategoriesError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default categories;
