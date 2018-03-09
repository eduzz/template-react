export const requestUserProfile = () => ({
  type: 'REQUEST_USER_PROFILE'
});

export const receiveUserProfile = (profile: Object) => ({
  type: 'RECEIVE_USER_PROFILE',
  profile
});

export const receiveUserProfileError = (err: any) => ({
  type: 'RECEIVE_USER_PROFILE_ERROR',
  err
});
