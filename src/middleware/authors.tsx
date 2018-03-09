// import actionCreators from 'actionCreators';
// import { get, post } from 'agent';

// const authors = store => next => action => {
//   next(action);

//   switch (action.type) {
//     case 'GET_AUTHORS':
//       get({ url: '/authors' }).then(
//         res => {
//           next(actionCreators.receiveAuthors(res.data.data));
//         },
//         err => {
//           next(actionCreators.receiveAuthorsError(err));
//         }
//       );
//       break;
//     case 'ADD_AUTHOR':
//       post({ url: '/authors', data: { ...action } }).then(
//         res => {
//           next(actionCreators.receiveAuthor(res.data.data));
//         },
//         err => {
//           next(actionCreators.receiveAuthorError(err));
//         }
//       );
//       break;
//     default:
//       break;
//   }
// };

// export default authors;
