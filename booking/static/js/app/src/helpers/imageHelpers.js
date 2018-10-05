// Returns a function for getting a URL for an image with width no greater than
// the provided value in px
export const getMaxSizeImageURL = (imageURL, {maxWidth, maxHeight}) => (
  // TODO: surely there is a more legible way to do this
  imageURL.replace(/upload\/()v1/gi, `upload/w_${maxWidth},h_${maxHeight},c_limit/v1`)
);
