const initialState = {
  title: '',
  description: '',
  category: {
    id: 0,
  },
  author: {
    id: 0,
  },
  customizations: {
    image_cover: '',
  },
  published: 1
};

const course = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'CLEAN_COURSE':
      return initialState;
    case 'RECEIVE_COURSE':
      return {
        ...state,
        ...action.course,
      };
    case 'DELETE_COURSE_SUCCESS':
      return {
        ...state,
        isDeleted: true
      };
    case 'RECEIVE_AUTHOR':
      return {
        ...state,
        author: {
          ...state.author,
          id: action.author.id,
        },
      };
    case 'RECEIVE_COURSE_IMAGE_COVER':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          image_cover: action.imageCover,
        },
      };
    case 'CLEAN_COURSE_IMAGE_COVER':
      return {
        ...state,
        customizations: {
          ...state.customizations,
          image_cover: '',
        },
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
    case 'RECEIVE_COURSE_PROGRESS':
      return {
        ...state,
        progress: action.progress,
      };
    default:
      return state;
  }
};

export default course;
