import { ICategory } from 'interfaces/category';

export enum enCategoryStoreActions {
  requestList = 'CATEGORY_LIST_REQUEST',
  receiveList = 'CATEGORY_LIST_RECEIVE',
  receiveListError = 'CATEGORY_LIST_RECEIVE_ERROR'
}

export interface IAppStoreCategoryState {
  isFetching: boolean;
  categories: ICategory[];
  error: any;
}

const initialState: IAppStoreCategoryState = {
  isFetching: false,
  categories: [],
  error: null
};

function category(state: IAppStoreCategoryState = initialState, action: any): IAppStoreCategoryState {
  switch (action.type as enCategoryStoreActions) {
    case enCategoryStoreActions.requestList:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case enCategoryStoreActions.receiveList:
      return {
        ...state,
        isFetching: false,
        categories: action.categories || [],
        error: null
      };
    case enCategoryStoreActions.receiveListError:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    default:
      return state;
  }
}

export default category;
