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
        case 'GET_COURSE_BASIC_INFO':
            get('5a03c6573100005d1f916af7').then(
                res => {
                    next(actions.receiveCourseBasicInfo(res.data));
                },
                err => {
                    next(actions.receiveCourseBasicInfoError(err));
                },
            );
            break;
        case 'GET_MODULE_LESSONS':
            get('5a0467a13100004a3a916dca', action.moduleId).then(
                res => {
                    next(actions.receiveModuleLessons(res.data, action.moduleId));
                },
                err => {
                    next(actions.receiveModuleLessonsError(err));
                },
            );
            break;
        default:
            break;
    }
};

export default middleware;
