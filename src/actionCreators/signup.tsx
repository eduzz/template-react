/* import { post } from 'agent';
 */
/* const receiveRegister = (user: any) => ({
  type: 'RECEIVE_REGISTER',
  token: user.token
});

const receiveRegisterError = (err: any) => ({
  type: 'RECEIVE_REGISTER_ERROR',
  err
}); */

export const requestRegister = (value: Object) =>
  (dispatch: any) => {
    console.log(value);
    /* post({ url: '/oauth/token', data: value }).then(
      res => console.log('sucesso'),
      err => console.log('erro'),
    ); */
  };