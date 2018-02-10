const initialState = {
    title: '',
    description: '',
    id_author: null,
    id_category: '130',
    image_cover: '',
    published: 1,
};

const course = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COURSE':
        case 'CLEAN_COURSE':
            return initialState;
        case 'RECEIVE_COURSE':
            return {
                ...state,
                ...action.course,
                id_category: action.course.category.id,
                id_author: action.course.author.id,
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
                id_author: action.author.id,
            };
        case 'RECEIVE_COURSE_CUSTOMIZATION':
            return {
                ...state,
                image_cover: action.customization.image_cover,
            };
        case 'RECEIVE_COURSE_CUSTOMIZATION_ERROR':
            return {
                ...state,
            };
        case 'CHANGE_COURSE_TITLE':
            return {
                ...state,
                title: action.title,
            };
        case 'CHANGE_COURSE_STATE':
            return {
                ...state,
                published: action.state,
            };
        case 'CHANGE_COURSE_COVER':
            return {
                ...state,
                image_cover: action.cover,
            };
        case 'CHANGE_COURSE_DESCRIPTION':
            return {
                ...state,
                description: action.description,
            };
        case 'CHANGE_COURSE_CATEGORY':
            return {
                ...state,
                id_category: action.categoryID,
            };
        case 'CHANGE_COURSE_AUTHOR':
            return {
                ...state,
                id_author: action.authorID,
            };
        case 'RECEIVE_IMAGE':
            return {
                ...state,
                image_cover: action.image.url,
            };
        case 'CREATE_COURSE':
            return {
                ...state,
                isDeleted: true,
            };
        case 'UPDATE_COURSE':
            return {
                ...state,
                isDeleted: true,
            };
        default:
            return state;
    }
};

export default course;
