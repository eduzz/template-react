const pageGrid = (state: any = { enabled: false }, action: any) => {
  switch (action.type) {
    case 'ENABLE_PAGE_GRID':
      return {
        enabled: true,
      };
    case 'DISABLE_PAGE_GRID':
      return {
        enabled: false,
      };
    default:
      return state;
  }
};

export default pageGrid;
