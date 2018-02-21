import actions from 'actions';
import { get, post, put, del } from 'agent';

const course = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_COURSE':
            get({url: '/courses/' + action.courseID}).then(
                res => {
                    next(actions.receiveCourse(res.data.data));
                },
                err => {
                    next(actions.receiveCourseError(err));
                }
            );
            break;
        case 'DELETE_COURSE':
            del({url: '/courses/' + action.courseID}).then(
                res => {
                    next(actions.deleteCourseSuccess(res));
                },
                err => {
                    next(actions.deleteCourseError(err));
                }
            );
            break;
        case 'CREATE_COURSE':
            post({url: '/courses/', data: action.course}).then(
                res => {
                    console.log('course -> ', res.data.data);
                },
                err => {

                }
            );
            break;
        case 'UPDATE_COURSE':
            put({url: '/courses/' + action.course.id, data: action.course}).then(
                res => {
                    console.log('course -> ', res.data.data);
                },
                err => {

                }
            );
            break;
        case 'GET_COURSE_CUSTOMIZATION':
            get({url: '/courses/' + action.courseID + '/customization'}).then(
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
