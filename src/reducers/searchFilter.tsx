const searchFilter = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'SEARCH_COURSES':
      return {
        ...state,
        courses: action.text
      };
    case 'GET_COURSES':
      return {};
    default:
      return state;
  }
};

export default searchFilter;
