const authors = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_AUTHORS':
            return [...action.authors];
        case 'GET_AUTHORS':
        case 'RECEIVE_AUTHORS_ERROR':
            return [];
        case 'RECEIVE_AUTHOR':
            return [
                ...state,
                action.author,
            ];
        case 'RECEIVE_AUTHOR_ERROR':
            console.error('RECEIVE_AUTHOR_ERROR');
            return [...state];
        default:
            return state;
    }
};

export default authors;
