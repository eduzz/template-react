const courses = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_COURSES': {
      let courses = [
        ...state,
        ...action.courses,
      ];

      courses['finished'] = true;
      courses['totalPages'] = action.totalPages;

      return courses;
    }
    case 'FETCH_COURSES': {
      let courses = [
        ...state,
      ];

      courses['finished'] = false;

      return courses;
    }
    case 'CLEAN_COURSES':
      return [];
    default:
      return state;
  }
};

export default courses;
