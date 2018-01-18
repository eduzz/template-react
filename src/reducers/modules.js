const modules = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_MODULES':
            return [...action.modules];
        case 'RECEIVE_MODULES_ERROR':
            return [];
        case 'RECEIVE_MODULE_LESSONS':
        case 'RECEIVE_MODULE_LESSONS_ERROR':
            return lessons(state, action);
        default:
            return state;
    }
};

const lessons = (state = [], action) => {
    switch (action.type) {
        case 'RECEIVE_MODULE_LESSONS':
            const newModules = state.modules.map(module => {
                if(module.id === action.moduleID) {
                    return {
                        ...module,
                        lessons: action.lessons,
                    };
                }
                return module;
            });

            return [
                ...state,
                modules: newModules,
            ];
        case 'RECEIVE_MODULE_LESSONS_ERROR':
            return [...state];
        default:
            return state;
    }
};

export default modules;
