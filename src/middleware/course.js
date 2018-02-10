import actions from 'actions';
import { get, post, put, del } from 'agent';

const course = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_COURSE':
            get('/courses/' + action.courseID).then(
                res => {
                    next(actions.receiveCourse(res.data.data));
                },
                err => {
                    next(actions.receiveCourseError(err));
                }
            );
            break;
        case 'DELETE_COURSE':
            del('/courses/' + action.courseID).then(
                res => {
                    next(actions.deleteCourseSuccess(res));
                },
                err => {
                    next(actions.deleteCourseError(err));
                }
            );
            break;
        case 'CREATE_COURSE':
            post('/courses/', action.course).then(
                res => {
                    console.log('course -> ', res.data.data);
                },
                err => {

                }
            );
            break;
        case 'UPDATE_COURSE':
            put('/courses/' + action.course.id, action.course).then(
                res => {
                    console.log('course -> ', res.data.data);
                },
                err => {

                }
            );
            break;
        case 'GET_COURSE_CUSTOMIZATION':
            get('/courses/' + action.courseID + '/customization').then(
                res => {
                    next(actions.receiveCourseCustomization(res.data.data));
                },
                err => {
                    next(actions.receiveCourseCustomizationError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default course;
