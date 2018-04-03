const authors = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_AUTHORS':
      return [...action.authors];
    case 'CLEAN_AUTHORS':
      return [];
    case 'RECEIVE_AUTHOR':
      return [...state, action.author];
    default:
      return state;
  }
};

export default authors;
