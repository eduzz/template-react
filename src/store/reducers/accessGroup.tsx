import { IAccessGroup } from 'interfaces/accessGroup';

export type typeAppStoreAccessGroupActions = 'REQUEST_ACCESS_GROUP_LIST' | 'RECEIVED_ACCESS_GROUP_LIST' | 'RECEIVED_ACCESS_GROUP_LIST_ERROR';

export interface IAppStoreAccessGroupState {
  isFetching: boolean;
  accessGroups: IAccessGroup[];
  error: any;
}

const initialState: IAppStoreAccessGroupState = {
  isFetching: false,
  accessGroups: [],
  error: null
};

function accessGroup(state: IAppStoreAccessGroupState = initialState, action: any): IAppStoreAccessGroupState {
  switch (action.type as typeAppStoreAccessGroupActions) {
    case 'REQUEST_ACCESS_GROUP_LIST':
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case 'RECEIVED_ACCESS_GROUP_LIST':
      return {
        ...state,
        isFetching: false,
        accessGroups: action.accessGroups || [],
        error: null
      };
    case 'RECEIVED_ACCESS_GROUP_LIST_ERROR':
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default accessGroup;
