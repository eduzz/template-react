import actions from 'actions';
import { post } from 'agent';

const upload = store => next => action => {

    next(action);

    switch (action.type) {
        case 'UPLOAD_IMAGE':
            post({url: '/courses/uploadimage', data: {data: action.image}}).then(
                res => {
                    next(actions.receiveImage(res.data.data, action.stateLabel));
                },
                err => {
                    next(actions.receiveImageError(err));
                }
            );
            break;
        case 'UPLOAD_LESSON_FILE':
            const formData = new FormData();

            formData.append('file', action.file);

            post({
                url: `/lessons/${action.lessonID}/upload`,
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress(progressEvent) {
                    next(actions.uploadLessonFileProgress(progressEvent, action.fileIndex));
                }
            });
        default:
            break;
    }
};

export default upload;
