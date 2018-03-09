const modules = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_MODULES':
      return [...action.modules];
    case 'RECEIVE_MODULES_ERROR':
      return [];
    case 'CLEAN_MODULES':
      return [];
    case 'RECEIVE_MODULE_LESSONS':
    case 'RECEIVE_MODULE_LESSONS_ERROR':
      return lessons(state, action);
    case 'ADD_MODULE':
      return [...state, {}];
    case 'REMOVE_MODULE': {
      const modules = [...state];

      modules.splice(action.index, 1);

      return modules;
    }
    case 'DELETE_MODULE':
      return state.filter((module: any) => module.id !== action.moduleID);
    case 'DELETE_MODULE_UNDO': {
      const modules = [...state];

      modules.splice(action.index, 0, action.module);

      return modules;
    }
    case 'RECEIVE_MODULE': {
      const modules = [...state];

      modules[action.sequence] = action.module;

      return [...modules];
    }
    case 'RECEIVE_MODULE_ERROR':
      return [...state];
    default:
      return state;
  }
};

const lessons = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_MODULE_LESSONS':
      const modules = state.map((module: any) => {
        if (module.id === action.moduleID) {
          return {
            ...module,
            lessons: action.lessons
          };
        }
        return module;
      });

      return [...modules];
    case 'RECEIVE_MODULE_LESSONS_ERROR':
      return [...state];
    default:
      return state;
  }
};

export default modules;
