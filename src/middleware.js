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
        case 'GET_LESSONS':
            get('5a0467a13100004a3a916dca', action.moduleID).then(
                res => {
                    next(actions.receiveLessons(res.data, action.moduleID));
                },
                err => {
                    next(actions.receiveLessonsError(err));
                },
            );
            break;
        default:
            break;
    }
};

export default middleware;
