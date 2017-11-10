const modules = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_MODULES':
            return [...action.modules];
        case 'RECEIVE_MODULES_ERROR':
            return [];
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
        			lessons: action.moduleID === module.id ? action.lessons : module.lessons,
        		};
        	});
        default:
        	return state;
	}
};

export default modules;
