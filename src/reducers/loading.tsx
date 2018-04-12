const initialState = {
  qtdRequestLoading: 0,
};

const loading = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'INCREASE_LOADING':
      return {
        ...state,
        qtdRequestLoading: state.qtdRequestLoading + 1
      };
    case 'DECREASE_LOADING':
      return {
        ...state,
        qtdRequestLoading: state.qtdRequestLoading - 1
      };
    default:
      return state;
  }
};

export default loading;
