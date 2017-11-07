import * as actions from './actions';
import { get } from './agent';

const middleware = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_COURSES':
            get('5a00b9323000000113fabd5b', action.id).then(
                res => {
                    next(actions.receiveCourses(res.data));
                },
                err => {
                    next(actions.receiveCoursesError(err));
                },
            );
            break;
        case 'GET_COURSE':
            get('5a00ba673000002a13fabd5e', action.id).then(
                res => {
                    next(actions.receiveCourse(res.data));
                },
                err => {
                    next(actions.receiveCourseError(err));
                },
            );
            break;
        default:
            break;
    }
};

export default middleware;
