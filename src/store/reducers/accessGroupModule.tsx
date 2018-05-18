import { IAccessGroupModule } from 'interfaces/accessGroupModule';

export enum enAccessGroupModuleStoreActions {
  requestList = 'ACCESS_GROUP_MODULE_LIST_REQUEST',
  receiveList = 'ACCESS_GROUP_MODULE_LIST_RECEIVE',
  receiveListError = 'ACCESS_GROUP_MODULE_LIST_RECEIVE_ERROR'
}

export interface IAppStoreAccessGroupModuleState {
  isFetching: boolean;
  accessGroupModules: IAccessGroupModule[];
  error: any;
}

const initialState: IAppStoreAccessGroupModuleState = {
  isFetching: false,
  accessGroupModules: [],
  error: null
};

function accessGroupModule(state: IAppStoreAccessGroupModuleState = initialState, action: any): IAppStoreAccessGroupModuleState {
  switch (action.type as enAccessGroupModuleStoreActions) {
    case enAccessGroupModuleStoreActions.requestList:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case enAccessGroupModuleStoreActions.receiveList:
      return {
        ...state,
        isFetching: false,
        accessGroupModules: action.accessGroupModules || [],
        error: null
      };
    case enAccessGroupModuleStoreActions.receiveListError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default accessGroupModule;
