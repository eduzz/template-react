export const uploadImage = (image, stateLabel) => ({
	type: 'UPLOAD_IMAGE',
    image,
    stateLabel,
});

export const receiveImage = (image, stateLabel) => ({
    type: 'RECEIVE_IMAGE',
    image,
    stateLabel,
});

export const receiveImageError = err => ({
    type: 'RECEIVE_IMAGE_ERROR',
    err,
});
