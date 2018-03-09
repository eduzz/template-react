import { get } from 'agent';

export const cleanAuthors = () => ({
  type: 'CLEAN_AUTHORS'
});

const receiveAuthors = (authors: Array<Object>) => ({
  type: 'RECEIVE_AUTHORS',
  authors
});

const receiveAuthorsError = (err: any) => ({
  type: 'RECEIVE_AUTHORS_ERROR',
  err
});

export const fetchAuthors = () => (dispatch: Function) =>
  get({ url: '/authors' }).then(
    res => dispatch(receiveAuthors(res.data.data)),
    err => dispatch(receiveAuthorsError(err))
  );

// const receiveAuthor = (author: any) => ({
//   type: 'RECEIVE_AUTHOR',
//   author
// });

// const receiveAuthorError = (err: any) => ({
//   type: 'RECEIVE_AUTHOR_ERROR',
//   err
// });

export const addAuthor = (name: string) => ({
  type: 'ADD_AUTHOR',
  name,
  description: 'test',
  avatar: 'test'
});
