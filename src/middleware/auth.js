import actionCreators from 'actionCreators';
import { post } from 'agent';

const auth = store => next => action => {
  next(action);

  switch (action.type) {
    case 'REQUEST_LOGIN':
      post({ url: '/oauth/token', data: action.creds }).then(
        res => {
          next(actionCreators.receiveLogin(res.data.data));
        },
        err => {
          next(actionCreators.receiveLoginError(err));
        }
      );
      break;
    default:
      break;
  }
};

export default auth;
