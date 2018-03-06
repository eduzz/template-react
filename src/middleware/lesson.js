import actionCreators from 'actionCreators';
import { get } from 'agent';

const lesson = store => next => action => {

    next(action);

    switch (action.type) {
        case 'GET_LESSON':
            get({url: '/lessons/' + action.lessonID}).then(
                res => {
                    next(actionCreators.receiveLesson(res.data.data));
                },
                err => {
                    next(actionCreators.receiveLessonError(err));
                }
            );
            break;
        default:
            break;
    }
};

export default lesson;
