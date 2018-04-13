const comments = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_COMMENTS':
      return [...action.comments];
    case 'RECEIVE_COMMENT':
      return [
        { ...action.comment },
        ...state,
      ];
    case 'CLEAN_COMMENTS':
      return [];
    case 'RECEIVE_ANSWERS':
      return answers(state, action);
    default:
      return state;
  }
};

const answers = (state: any = [], action: any) => {
  switch (action.type) {
    case 'RECEIVE_ANSWERS':
      return state.map((comment: any) => {
        if (comment.id === action.commentID) {
          return {
            ...comment,
            answers: action.answers,
          };
        }

        return {
          ...comment,
        };
      });
    default:
      return state;
  }
};

export default comments;
