const course = (state = {}, action) => {
    switch (action.type) {
        case 'RECEIVE_COURSE_BASIC_INFO':
            return {...action.course};
        case 'RECEIVE_COURSE_BASIC_INFO_ERROR':
            return {};
        case 'RECEIVE_MODULE_LESSONS':
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
		case 'RECEIVE_MODULE_LESSONS':
			return state.map(module => {
    			return {
        			...module,
        			lessons: module.id === action.moduleId ? action.lessons : module.lessons,
        		};
        	});
        default:
        	return state;
	}
};

export default course;
