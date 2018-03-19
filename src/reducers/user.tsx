const user = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'RECEIVE_USER_PROFILE':
      return { ...action.profile };
    case 'RECEIVE_USER_PROFILE_ERROR':
      return {};
    default:
      return state;
  }
};

export default user;
