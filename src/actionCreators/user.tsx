export const requestUserProfile = () => ({
  type: 'REQUEST_USER_PROFILE'
});

export const receiveUserProfile = (profile: Object) => ({
  type: 'RECEIVE_USER_PROFILE',
  profile
});
