import actions from './actions';
import { get, post } from './agent';

const middleware = store => next => action => {

    next(action);

    switch (action.type) {
        case 'SUBMIT_LOGIN':
            const data = {
                username: action.email,
                password: action.password,
            };

            post('/oauth/token', data).then(
                res => {
                    window.localStorage.setItem('authToken', res.data.data.token);
                    window.location.href = '/';
                },
                err => {
                    console.log(err);
                }
            );
            break;
        case 'GET_COURSES':
            const headers = {
                Authorization: 'Bearer ' + window.localStorage.getItem('authToken'),
            };

            get('/courses', headers).then(
                res => {
                    console.log(res);
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
