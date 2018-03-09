export const uploadImage = (image: Object, stateLabel: string) => ({
  type: 'UPLOAD_IMAGE',
  image,
  stateLabel
});

export const receiveImage = (image: Object, stateLabel: string) => ({
  type: 'RECEIVE_IMAGE',
  image,
  stateLabel
});

export const receiveImageError = (err: any) => ({
  type: 'RECEIVE_IMAGE_ERROR',
  err
});

export const uploadLessonFile = (file: Object, lessonID: number, fileIndex: number) => ({
  type: 'UPLOAD_LESSON_FILE',
  file,
  lessonID,
  fileIndex
});

export const uploadLessonFileProgress = (progressEvent: Event, fileIndex: number) => ({
  type: 'UPLOAD_LESSON_FILE_PROGRESS',
  progressEvent,
  fileIndex
});
