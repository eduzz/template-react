const rating = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'RECEIVE_RATING':
      return { ...action.rating };
    default:
      return state;
  }
};

export default rating;
