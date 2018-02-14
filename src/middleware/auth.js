import actions from 'actions';
import { post } from 'agent';

const auth = store => next => action => {

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
        default:
            break;
    }
};

export default auth;
