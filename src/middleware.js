import * as actions from './actions';
import { get } from './agent';

const middleware = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_COURSES':
            get('5a034556310000a20c9169f9', action.id).then(
                res => {
                    next(actions.receiveCourses(res.data));
                },
                err => {
                    next(actions.receiveCoursesError(err));
                },
            );
            break;
        case 'GET_COURSE':
            get('5a03c6573100005d1f916af7', action.id).then(
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
