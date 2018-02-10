import actions from 'actions';
import { post } from 'agent';

const upload = store => next => action => {

    next(action);

    switch (action.type) {
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

export default upload;
