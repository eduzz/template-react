const user = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'RECEIVE_USER_PROFILE':
      return { ...action.profile };
    default:
      return state;
  }
};

export default user;
