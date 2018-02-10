export const getCategories = () => ({
	type: 'GET_CATEGORIES',
});

export const cleanCategories = () => ({
	type: 'CLEAN_CATEGORIES',
});

export const receiveCategories = categories => ({
	type: 'RECEIVE_CATEGORIES',
	categories,
});

export const receiveCategoriesError = err => ({
	type: 'RECEIVE_CATEGORIES_ERROR',
	err,
});
