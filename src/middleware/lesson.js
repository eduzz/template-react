import actions from 'actions';
import { get } from 'agent';

const lesson = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_LESSON':
            get('/lessons/' + action.lessonID).then(
                res => {
                    next(actions.receiveLesson(res.data.data));
                },
                err => {
                    next(actions.receiveLessonError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default lesson;
