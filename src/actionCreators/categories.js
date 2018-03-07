import { get } from 'agent';

export const cleanCategories = () => ({
  type: 'CLEAN_CATEGORIES'
});

const receiveCategories = categories => ({
  type: 'RECEIVE_CATEGORIES',
  categories
});

const receiveCategoriesError = err => ({
  type: 'RECEIVE_CATEGORIES_ERROR',
  err
});

export const fetchCategories = () => dispatch => {
  dispatch(cleanCategories());

  get({ url: '/categories' }).then(
    res => {
      dispatch(receiveCategories(res.data.data));
    },
    err => {
      dispatch(receiveCategoriesError(err));
    }
  );
};
