import { IAccessGroup } from 'interfaces/accessGroup';

export enum enAccessGroupStoreActions {
  openForm = 'ACCESS_GROUP_FORM_OPEN',
  closeForm = 'ACCESS_GROUP_FORM_CANCEL',

  requestList = 'ACCESS_GROUP_LIST_REQUEST',
  receiveList = 'ACCESS_GROUP_LIST_RECEIVE',
  receiveListError = 'ACCESS_GROUP_LIST_RECEIVE_ERROR',

  requestDelete = 'ACCESS_GROUP_DELETE_REQUEST',
  receiveDelete = 'ACCESS_GROUP_DELETE_RECEIVE',
  receiveDeleteError = 'ACCESS_GROUP_DELETE_RECEIVE_ERROR',

  requestSave = 'ACCESS_GROUP_SAVE_REQUEST',
  receiveSave = 'ACCESS_GROUP_SAVE_RECEIVE',
  receiveSaveError = 'ACCESS_GROUP_SAVE_RECEIVE_ERROR'
}

export interface IAppStoreAccessGroupState {
  isFetching: boolean;
  isSaving: boolean;
  accessGroups: IAccessGroup[];
  error: any;
  saveError: any;
  isAccessGroupFormModalOpened: boolean;
}

const initialState: IAppStoreAccessGroupState = {
  isFetching: false,
  isSaving: false,
  accessGroups: [],
  error: null,
  saveError: null,
  isAccessGroupFormModalOpened: false
};

export default function accessGroup(state: IAppStoreAccessGroupState = initialState, action: any): IAppStoreAccessGroupState {
  switch (action.type as enAccessGroupStoreActions) {
    case enAccessGroupStoreActions.openForm:
    case enAccessGroupStoreActions.closeForm:
      return form(state, action);

    case enAccessGroupStoreActions.requestList:
    case enAccessGroupStoreActions.receiveList:
    case enAccessGroupStoreActions.receiveListError:
      return list(state, action);

    case enAccessGroupStoreActions.requestDelete:
    case enAccessGroupStoreActions.receiveDelete:
    case enAccessGroupStoreActions.receiveDeleteError:
      return del(state, action);

    case enAccessGroupStoreActions.requestSave:
    case enAccessGroupStoreActions.receiveSave:
    case enAccessGroupStoreActions.receiveSaveError:
      return save(state, action);
    default:
      return state;
  }
}

function form(state: IAppStoreAccessGroupState, action: any): IAppStoreAccessGroupState {
  switch (action.type as enAccessGroupStoreActions) {
    case enAccessGroupStoreActions.openForm:
      return {
        ...state,
        isAccessGroupFormModalOpened: true
      };
    case enAccessGroupStoreActions.closeForm:
      return {
        ...state,
        isAccessGroupFormModalOpened: false
      };
    default:
      return state;
  }
}

function list(state: IAppStoreAccessGroupState, action: any): IAppStoreAccessGroupState {
  switch (action.type as enAccessGroupStoreActions) {
    case enAccessGroupStoreActions.requestList:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case enAccessGroupStoreActions.receiveList:
      return {
        ...state,
        isFetching: false,
        accessGroups: (action.accessGroups || []).map((a: IAccessGroup, index: number) => ({ ...a, index })),
        error: null
      };
    case enAccessGroupStoreActions.receiveListError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

function save(state: IAppStoreAccessGroupState, action: any): IAppStoreAccessGroupState {
  switch (action.type as enAccessGroupStoreActions) {
    case enAccessGroupStoreActions.requestSave:
      return {
        ...state,
        isSaving: true
      };
    case enAccessGroupStoreActions.receiveSave:
      return {
        ...state,
        isSaving: false,
        isAccessGroupFormModalOpened: false
      };
    case enAccessGroupStoreActions.receiveSaveError:
      return {
        ...state,
        isSaving: false,
        saveError: action.error
      };
    default:
      return state;
  }
}

function del(state: IAppStoreAccessGroupState = initialState, action: any): IAppStoreAccessGroupState {
  switch (action.type as enAccessGroupStoreActions) {
    case enAccessGroupStoreActions.requestDelete:
      return {
        ...state,
        accessGroups: [
          ...state.accessGroups.slice(0, action.accessGroup.index),
          { ...action.accessGroup, isFetching: true },
          ...state.accessGroups.slice(action.accessGroup.index + 1)
        ]
      };
    case enAccessGroupStoreActions.receiveDelete:
      return {
        ...state,
        accessGroups: ([
          ...state.accessGroups.slice(0, action.accessGroup.index),
          ...state.accessGroups.slice(action.accessGroup.index + 1)
        ]).map((a: IAccessGroup, index: number) => ({ ...a, index }))
      };
    case enAccessGroupStoreActions.receiveDeleteError:
      return {
        ...state,
        accessGroups: [
          ...state.accessGroups.slice(0, action.accessGroup.index),
          { ...action.accessGroup, isFetching: false, error: action.error },
          ...state.accessGroups.slice(action.accessGroup.index + 1)
        ]
      };
    default:
      return state;
  }
}