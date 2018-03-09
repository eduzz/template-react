// import actionCreators from 'actionCreators';
// import { get, post, put, del } from 'agent';

// const modules = store => next => action => {
//   next(action);

//   switch (action.type) {
//     case 'GET_MODULES':
//       get({ url: `/courses/${action.courseID}/modules` }).then(
//         res => {
//           next(actionCreators.receiveModules(res.data.data));
//         },
//         err => {
//           next(actionCreators.receiveModulesError(err));
//         }
//       );
//       break;
//     case 'GET_MODULE_LESSONS':
//       get({ url: `/modules/${action.moduleID}/lessons` }).then(
//         res => {
//           next(
//             actionCreators.receiveModuleLessons(res.data.data, action.moduleID)
//           );
//         },
//         err => {
//           next(actionCreators.receiveModuleLessonsError(err));
//         }
//       );
//       break;
//     case 'POST_MODULE':
//       post({
//         url: '/modules',
//         data: {
//           id_course: action.courseID,
//           title: action.title,
//           description: 'description',
//           days_locked: 1,
//           is_draft: false,
//           id_author: null,
//           available_days: 1,
//           release_date: '2018-07-07',
//           image: 'base64',
//           sequence: action.sequence,
//           is_free: true
//         }
//       }).then(
//         res => {
//           next(actionCreators.receiveModule(res.data.data, action.sequence));
//         },
//         err => {
//           next(actionCreators.receiveModuleError(err));
//         }
//       );
//       break;
//     case 'DELETE_MODULE_PERSIST':
//       del({ url: '/modules/' + action.moduleID }).then(res => {}, err => {});
//       break;
//     case 'EDIT_MODULE_PERSIST':
//       put({ url: '/modules/' + action.module.id, data: action.module }).then(
//         res => {
//           next(actionCreators.receiveModule(res.data.data, action.index));
//         },
//         err => {
//           next(actionCreators.receiveModuleError(err));
//         }
//       );
//       break;
//     default:
//       break;
//   }
// };

// export default modules;
