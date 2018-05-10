export type typeAppStoreDrawerActions = 'OPEN_DRAWER' | 'CLOSE_DRAWER';

export interface IAppStoreDrawerState {
  isOpened: boolean;
}

const initialState: IAppStoreDrawerState = {
  isOpened: false
};

function drawer(state: IAppStoreDrawerState = initialState, action: any): IAppStoreDrawerState {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return {
        ...state,
        isOpened: true
      };
    case 'CLOSE_DRAWER':
      return {
        ...state,
        isOpened: false
      };
    default:
      return state;
  }
}

export default drawer;
