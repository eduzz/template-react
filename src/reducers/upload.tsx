const upload = (state: any = {}, action: any) => {
  switch (action.type) {
    case 'RECEIVE_IMAGE':
      return {
        ...state,
        [action.stateLabel]: action.image
      };
    case 'UPLOAD_IMAGE':
    case 'RECEIVE_IMAGE_ERROR':
      return {
        ...state,
        [action.stateLabel]: undefined
      };
    default:
      return state;
  }
};

export default upload;
