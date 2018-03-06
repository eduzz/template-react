const authors = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_AUTHORS':
            return [...action.authors];
        case 'RECEIVE_AUTHORS_ERROR':
            return [];
        case 'CLEAN_AUTHORS':
            return [];
        case 'RECEIVE_AUTHOR':
            return [
                ...state,
                action.author,
            ];
        case 'RECEIVE_AUTHOR_ERROR':
            return [...state];
        default:
            return state;
    }
};

export default authors;
