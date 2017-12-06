const searchFilter = (state = {}, action) => {
	switch (action.type) {
        case 'SEARCH_COURSES':
            return {
            	...state,
            	courses: action.text,
            };
        default:
            return state;
    }
};

export default searchFilter;
