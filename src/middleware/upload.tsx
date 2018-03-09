// import actionCreators from 'actionCreators';
// import { post } from 'agent';

// const upload = store => next => action => {
//   next(action);

//   switch (action.type) {
//     case 'UPLOAD_IMAGE':
//       post({ url: '/courses/uploadimage', data: { data: action.image } }).then(
//         res => {
//           next(actionCreators.receiveImage(res.data.data, action.stateLabel));
//         },
//         err => {
//           next(actionCreators.receiveImageError(err));
//         }
//       );
//       break;
//     case 'UPLOAD_LESSON_FILE':
//       const formData = new FormData();

//       formData.append('file', action.file);

//       post({
//         url: `/lessons/${action.lessonID}/upload`,
//         data: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         onUploadProgress(progressEvent) {
//           next(
//             actionCreators.uploadLessonFileProgress(
//               progressEvent,
//               action.fileIndex
//             )
//           );
//         }
//       });
//       break;
//     default:
//       break;
//   }
// };

// export default upload;
