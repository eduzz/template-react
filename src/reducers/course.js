const course = (state = {}, action) => {
    switch (action.type) {
        case 'GET_COURSE':
        case 'CLEAN_COURSE':
            return {};
        case 'RECEIVE_COURSE':
            return {
                ...state,
                ...action.course
            };
        case 'RECEIVE_COURSE_ERROR':
            return {};
        case 'DELETE_COURSE_SUCCESS':
            return {
                ...state,
                isDeleted: true,
            };
        case 'DELETE_COURSE_ERROR':
            return state;
        case 'RECEIVE_AUTHOR':
            return {
                ...state,
                author: action.author,
            };
        case 'RECEIVE_COURSE_CUSTOMIZATION':
            return {
                ...state,
                customization: action.customization,
            };
        case 'RECEIVE_COURSE_CUSTOMIZATION_ERROR':
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default course;
