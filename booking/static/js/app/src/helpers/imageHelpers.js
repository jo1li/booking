// Returns a function for getting a URL for an image with width no greater than
// the provided value in px
export const getMaxWidthImageURL = (maxWidth) => (imageURL) => (
  // TODO: surely there is a more legible way to do this
  imageURL.replace(/upload\/()v1/gi, `upload/w_${maxWidth},c_limit/v1`)
);
