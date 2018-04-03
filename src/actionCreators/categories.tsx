import { get } from 'agent';

export const cleanCategories = () => ({
  type: 'CLEAN_CATEGORIES'
});

const receiveCategories = (categories: Array<Object>) => ({
  type: 'RECEIVE_CATEGORIES',
  categories
});

export const fetchCategories = () => (dispatch: Function) => {
  dispatch(cleanCategories());

  get({ url: '/categories' }).then(
    res => dispatch(receiveCategories(res.data.data))
  );
};
