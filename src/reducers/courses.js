const courses = (state = [], action) => {
    switch (action.type) {
        case 'GET_COURSES':
            return [];
        case 'RECEIVE_COURSES':
            return [...action.courses];
        case 'RECEIVE_COURSES_ERROR':
            return [];
        default:
            return state;
    }
};

export default courses;
