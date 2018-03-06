const categories = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_CATEGORIES':
            return [...action.categories];
        case 'RECEIVE_CATEGORIES_ERROR':
            return [];
        case 'CLEAN_CATEGORIES':
            return [];
        default:
            return state;
    }
};

export default categories;
