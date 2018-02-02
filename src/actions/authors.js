export const getAuthors = () => ({
	type: 'GET_AUTHORS',
});

export const cleanAuthors = () => ({
	type: 'CLEAN_AUTHORS',
});


export const receiveAuthors = authors => ({
	type: 'RECEIVE_AUTHORS',
	authors,
});

export const receiveAuthorsError = err => ({
	type: 'RECEIVE_AUTHORS_ERROR',
	err,
});

export const addAuthor = name => ({
    type: 'ADD_AUTHOR',
    name,
    description: 'test',
    avatar: 'test',
});

export const receiveAuthor = author => ({
    type: 'RECEIVE_AUTHOR',
    author,
});

export const receiveAuthorError = err => ({
    type: 'RECEIVE_AUTHOR_ERROR',
    err,
});
