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
        case 'GET_CATEGORIES':
            get('/categories').then(
                res => {
                    next(actions.receiveCategories(res.data.data));
                },
                err => {
                    next(actions.receiveCategoriesError(err));
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
        case 'ADD_AUTHOR':
            post('/authors', {...action}).then(
                res => {
                    next(actions.receiveAuthor(res.data.data));
                },
                err => {
                    next(actions.receiveAuthorError(err));
                }
            );
            break;
        case 'GET_MODULES':
            get(`/courses/${action.courseID}/modules`).then(
                res => {
                    next(actions.receiveModules(res.data.data));
                },
                err => {
                    next(actions.receiveModulesError(err));
                }
            );
            break;
        case 'GET_MODULE_LESSONS':
            get(`/modules/${action.moduleID}/lessons`).then(
                res => {
                    next(actions.receiveModuleLessons(res.data.data, action.moduleID));
                },
                err => {
                    next(actions.receiveModuleLessonsError(err));
                }
            );
            break;
        case 'POST_MODULE':
            post('/modules', {id_course: action.courseID, title: action.title, description: 'description', days_locked: 1, is_draft: false, id_author: null, available_days: 1, release_date: '2018-07-07', image: 'base64', sequence: action.sequence, is_free: true}).then(
                res => {
                    next(actions.receiveModule(res.data.data, action.sequence));
                },
                err => {
                    next(actions.receiveModuleError(err));
                }
            );
            break;
        case 'UPLOAD_IMAGE':
            post('/courses/uploadimage', {data: action.image}).then(
                res => {
                    next(actions.receiveImage(res.data.data, action.stateLabel));
                },
                err => {
                    next(actions.receiveImageError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default middleware;
