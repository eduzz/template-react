import actions from 'actions';
import { get, post, put, del } from 'agent';

const modules = store => next => action => {

    next(action);

    switch (action.type) {
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
        case 'DELETE_MODULE_PERSIST':
            del('/modules/' + action.moduleID).then(
                res => {

                },
                err => {

                }
            );
            break;
        case 'EDIT_MODULE_PERSIST':
            put('/modules/' + action.module.id, action.module).then(
                res => {
                    next(actions.receiveModule(res.data.data, action.index));
                },
                err => {
                    next(actions.receiveModuleError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default modules;
