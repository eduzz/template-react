import actions from 'actions';
import { get } from 'agent';

const courses = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_COURSES':
            get('/courses?page=1&size=9999').then(
                res => {
                    next(actions.receiveCourses(res.data.data));
                },
                err => {
                    next(actions.receiveCoursesError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default courses;
