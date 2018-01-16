export const getAuthors = () => ({
	type: 'GET_AUTHORS',
});

export const receiveAuthors = authors => ({
	type: 'RECEIVE_AUTHORS',
	authors,
});

export const receiveAuthorsError = err => ({
	type: 'RECEIVE_AUTHORS_ERROR',
	err,
});
