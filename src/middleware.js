import actions from './actions';
import { get, post } from './agent';

const middleware = store => next => action => {

    next(action);

    switch (action.type) {
        case 'REQUEST_LOGIN':
            post('/oauth/token', action.creds).then(
                res => {
                    next(actions.receiveLogin(res.data.data));
                },
                err => {
                    next(actions.receiveLoginError(err));
                }
            );
            break;
        case 'GET_COURSES':
            get('/courses').then(
                res => {
                    next(actions.receiveCourses(res.data.data));
                },
                err => {
                    next(actions.receiveCoursesError(err));
                }
            );
            break;
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
        case 'GET_AUTHORS':
            get('/authors').then(
                res => {
                    next(actions.receiveAuthors(res.data.data));
                },
                err => {
                    next(actions.receiveAuthorsError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default middleware;
