import { get } from 'agent';

export const cleanAuthors = () => ({
  type: 'CLEAN_AUTHORS'
});

const receiveAuthors = authors => ({
  type: 'RECEIVE_AUTHORS',
  authors
});

const receiveAuthorsError = err => ({
  type: 'RECEIVE_AUTHORS_ERROR',
  err
});

export const fetchAuthors = () => dispatch =>
  get({ url: '/authors' }).then(
    res => dispatch(receiveAuthors(res.data.data)),
    err => dispatch(receiveAuthorsError(err))
  );

// const receiveAuthor = author => ({
//   type: 'RECEIVE_AUTHOR',
//   author
// });

// const receiveAuthorError = err => ({
//   type: 'RECEIVE_AUTHOR_ERROR',
//   err
// });

export const addAuthor = name => ({
  type: 'ADD_AUTHOR',
  name,
  description: 'test',
  avatar: 'test'
});
