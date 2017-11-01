const course = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_COURSE':
            return {...action.course};
        case 'RECEIVE_COURSE_ERROR':
            return {};
        case 'RECEIVE_LESSONS':
			return {
				...state,
				modules: lessons(state.modules, action),
			};
        default:
            return state;
    }
};

const lessons = (state = [], action) => {
	switch (action.type) {
		case 'RECEIVE_LESSONS':
			return state.map(module => {
    			return {
        			...module,
        			lessons: module.id === action.id ? action.lessons : [],
        		};
        	});
        default:
        	return state;
	}
};

export default course;