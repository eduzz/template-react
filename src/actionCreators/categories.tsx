import { get } from 'agent';

export const cleanCategories = () => ({
  type: 'CLEAN_CATEGORIES'
});

const receiveCategories = (categories: Array<Object>) => ({
  type: 'RECEIVE_CATEGORIES',
  categories
});

const receiveCategoriesError = (err: any) => ({
  type: 'RECEIVE_CATEGORIES_ERROR',
  err
});

export const fetchCategories = () => (dispatch: Function) => {
  dispatch(cleanCategories());

  get({ url: '/categories?page=1&size=9999' }).then(
    res => {
      dispatch(receiveCategories(res.data.data));
    },
    err => {
      dispatch(receiveCategoriesError(err));
    }
  );
};
