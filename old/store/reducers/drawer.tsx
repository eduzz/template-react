export enum enDrawerStoreActions {
  open = 'DRAWER_OPEN',
  close = 'CDRAWER_LOSE'
}

export interface IAppStoreDrawerState {
  isOpened: boolean;
}

const initialState: IAppStoreDrawerState = {
  isOpened: false
};

function drawer(state: IAppStoreDrawerState = initialState, action: any): IAppStoreDrawerState {
  switch (action.type as enDrawerStoreActions) {
    case enDrawerStoreActions.open:
      return {
        ...state,
        isOpened: true
      };
    case enDrawerStoreActions.close:
      return {
        ...state,
        isOpened: false
      };
    default:
      return state;
  }
}

export default drawer;
