import { get } from 'api';
import { logError } from 'errorHandler';
import { IApiResponse } from 'interfaces/apiResponse';
import { ICategory } from 'interfaces/category';
import { IActionCreator } from 'store/interfaces';

import { enCategoryStoreActions } from '../reducers/category';

export function requestCategoryList(): IActionCreator<enCategoryStoreActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().category.isFetching) return;

      dispatch({ type: enCategoryStoreActions.requestList });

      const { data } = await get<IApiResponse<ICategory[]>>('/categories');
      dispatch({ type: enCategoryStoreActions.receiveList, categories: data });
    } catch (error) {
      logError(error);
      dispatch({ type: enCategoryStoreActions.receiveListError, error });
    }
  };
}

export function cleanCategoryListError(): IActionCreator<enCategoryStoreActions> {
  return dispatch => dispatch({ type: enCategoryStoreActions.receiveListError, error: null });
}