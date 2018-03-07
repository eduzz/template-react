const initialState = {
  title: '',
  description: '',
  id_author: null,
  id_category: 130,
  customizations: {
    image_cover: ''
  },
  published: 1
};

const course = (state = initialState, action) => {
  switch (action.type) {
    case 'CLEAN_COURSE':
      return initialState;
    case 'RECEIVE_COURSE':
      return {
        ...action.course,
        id_category: action.course.category.id,
        id_author: action.course.author.id
      };
    case 'RECEIVE_COURSE_ERROR':
      return {};
    case 'DELETE_COURSE_SUCCESS':
      return {
        ...state,
        isDeleted: true
      };
    case 'DELETE_COURSE_ERROR':
      return state;
    case 'RECEIVE_AUTHOR':
      return {
        ...state,
        id_author: action.author.id
      };
    case 'RECEIVE_IMAGE':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          image_cover: action.image.url
        }
      };
    case 'CREATE_COURSE':
      return {
        ...state,
        isDeleted: true
      };
    case 'UPDATE_COURSE':
      return {
        ...state,
        isDeleted: true
      };
    case 'CHANGE_COURSE_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    default:
      return state;
  }
};

export default course;
