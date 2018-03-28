const highlights = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_HIGHLIGHTS':
      return [...action.highlights];
    case 'RECEIVE_HIGHLIGHTS_ERROR':
      return [];
    default:
      return state;
  }
};

export default highlights;
