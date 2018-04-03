const initialState = {
  id_author: 0,
};

const lesson = (state: any = initialState, action: any) => {
  switch (action.type) {
    case 'CLEAN_LESSON':
      return initialState;
    case 'RECEIVE_LESSON':
      const chats = action.lesson.chats || {};

      return {
        ...state,
        ...action.lesson,
        chats: {
          ...chats,
          hasjivochat: Boolean(parseInt(chats.hasjivochat, 10)),
          haszopimchat: Boolean(parseInt(chats.haszopimchat, 10)),
          hastawktochat: Boolean(parseInt(chats.hastawktochat, 10)),
          haszendeskchat: Boolean(parseInt(chats.haszendeskchat, 10)),
          haslivechat: Boolean(parseInt(chats.haslivechat, 10)),
          haschatroll: Boolean(parseInt(chats.haschatroll, 10)),
        }
      };
    case 'RECEIVE_AUTHOR':
      return {
        ...state,
        id_author: action.author.id
      };
    case 'CHANGE_LESSON_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'ADD_LESSON_FILES': {
      const files = [...action.files].map(file => ({
        front_id: action.frontId,
        title: file.name,
        size: file.size,
        mimetype: file.type.substring(file.type.indexOf('/') + 1),
        progress: 0
      }));

      return {
        ...state,
        lesson_files: [...state.lesson_files, ...files]
      };
    }
    case 'REMOVE_LESSON_FILE':
      return {
        ...state,
        lesson_files: state.lesson_files.filter((file: any, i: number) => action.index !== i)
      };
    case 'UPLOAD_LESSON_FILE_PROGRESS': {
      const files = [...state.lesson_files];

      files[action.fileIndex].progress =
        action.progressEvent.loaded / action.progressEvent.total * 100;

      return {
        ...state,
        lesson_files: files
      };
    }
    default:
      return state;
  }
};

export default lesson;
