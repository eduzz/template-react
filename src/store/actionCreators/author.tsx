import { get, post, put } from 'api';
import { logError } from 'errorHandler';
import { IPaginationApiResquest } from 'interfaces/apiRequest';
import { IPaginationApiResponse } from 'interfaces/apiResponse';
import { IAuthor } from 'interfaces/author';
import { IActionCreator } from 'store/interfaces';

import { enAuthorStoreActions } from '../reducers/author';

export function openAuthorFormModal(): IActionCreator<enAuthorStoreActions> {
  return async dispatch => dispatch({ type: enAuthorStoreActions.openForm });
}

export function cancelAuthorFormModal(): IActionCreator<enAuthorStoreActions> {
  return async dispatch => dispatch({ type: enAuthorStoreActions.closeForm });
}

export function requestAuthorList(pagination: IPaginationApiResquest = null): IActionCreator<enAuthorStoreActions> {
  return async (dispatch, getState) => {
    try {
      if (getState().author.isFetching) return;

      dispatch({ type: enAuthorStoreActions.requestList });

      const { data } = await get<IPaginationApiResponse<IAuthor[]>>('/authors', { ...pagination });
      dispatch({ type: enAuthorStoreActions.receiveList, authors: data });
    } catch (error) {
      logError(error);
      dispatch({ type: enAuthorStoreActions.receiveListError, error });
    }
  };
}

export function cleanAuthorListError(): IActionCreator<enAuthorStoreActions> {
  return dispatch => dispatch({ type: enAuthorStoreActions.receiveListError, error: null });
}

export function requestAuthorSave(model: IAuthor): IActionCreator<enAuthorStoreActions> {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: enAuthorStoreActions.requestSave, model });

      //TODO: REMOVE TESTE
      const { data } = model.id ?
        await put(`/authors/${model.id}`, { avatar: 'teste', ...model }) :
        await post('/authors', { avatar: 'teste', ...model });

      dispatch({ type: enAuthorStoreActions.receiveSave, author: data });
    } catch (error) {
      logError(error);
      dispatch({ type: enAuthorStoreActions.receiveSaveError, error });
    }
  };
}

export function cleanAuthorSaveError(): IActionCreator<enAuthorStoreActions> {
  return dispatch => dispatch({ type: enAuthorStoreActions.receiveSaveError, error: null });
}