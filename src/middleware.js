import * as actions from './actions';
import { getMock } from './agent';

const middleware = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_COURSES':
            getMock('courses').then(
                res => {
                    next(actions.receiveCourses(res.data));
                },
                err => {
                    next(actions.receiveCoursesError(err));
                },
            );
            break;
        default:
            break;
    }
};

export default middleware;
