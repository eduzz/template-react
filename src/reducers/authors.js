const authors = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_AUTHORS':
            return [...action.authors];
        case 'RECEIVE_AUTHORS_ERROR':
            return [];
        case 'RECEIVE_AUTHOR':
            return [
                action.author,
                ...state,
            ];
        case 'RECEIVE_AUTHOR':
            console.error('RECEIVE_AUTHOR');
            return [...state];
        default:
            return state;
    }
};

export default authors;
