export const uploadImage = (image, stateLabel) => ({
  type: 'UPLOAD_IMAGE',
  image,
  stateLabel
});

export const receiveImage = (image, stateLabel) => ({
  type: 'RECEIVE_IMAGE',
  image,
  stateLabel
});

export const receiveImageError = err => ({
  type: 'RECEIVE_IMAGE_ERROR',
  err
});

export const uploadLessonFile = (file, lessonID, fileIndex) => ({
  type: 'UPLOAD_LESSON_FILE',
  file,
  lessonID,
  fileIndex
});

export const uploadLessonFileProgress = (progressEvent, fileIndex) => ({
  type: 'UPLOAD_LESSON_FILE_PROGRESS',
  progressEvent,
  fileIndex
});
