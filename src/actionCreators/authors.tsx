import { get, post } from 'agent';

export const cleanAuthors = () => ({
  type: 'CLEAN_AUTHORS'
});

const receiveAuthors = (authors: Array<Object>) => ({
  type: 'RECEIVE_AUTHORS',
  authors,
});

export const fetchAuthors = () => (dispatch: Function) =>
  get({ url: '/authors' }).then(
    res => dispatch(receiveAuthors(res.data.data))
  );

const receiveAuthor = (author: any) => ({
  type: 'RECEIVE_AUTHOR',
  author,
});

export const addAuthor = (name: string) =>
  (dispatch: any) => {
    post({ url: '/authors', data: { name, description: 'test', avatar: 'test' } }).then(
      res => dispatch(receiveAuthor(res.data.data))
    );
  };
