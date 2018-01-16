const authors = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_AUTHORS':
            return [...action.authors];
        case 'RECEIVE_AUTHORS_ERROR':
            return [];
        default:
            return state;
    }
};

export default authors;
