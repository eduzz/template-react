import * as actions from './actions';
import { getMock } from './agent';

const middleware = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_COURSES':
            getMock('courses', action.id).then(
                res => {
                    next(actions.receiveCourses(res.data));
                },
                err => {
                    next(actions.receiveCoursesError(err));
                },
            );
            break;
        case 'GET_COURSE':
            getMock('course', action.id).then(
                res => {
                    next(actions.receiveCourse(res.data));
                },
                err => {
                    next(actions.receiveCourseError(err));
                },
            );
        default:
            break;
    }
};

export default middleware;
