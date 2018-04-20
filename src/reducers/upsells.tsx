const upsells = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_UPSELLS':
      return [...action.upsells];
    case 'CLEAN_UPSELLS':
      return [];
    default:
      return state;
  }
};

export default upsells;
