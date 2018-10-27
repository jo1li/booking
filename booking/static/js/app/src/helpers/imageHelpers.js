// Returns a function for getting a URL for an image with width no greater than
// the provided value in px
export const getMaxSizeImageURL = (imageURL, {maxWidth, maxHeight}) => (
  // TODO: surely there is a more legible way to do this
  imageURL.replace(/upload\/()v1/gi, `upload/w_${maxWidth},h_${maxHeight},c_limit/v1`)
);

// Gets a cloudinary URL for an image that will fill a 114px x 80px thumbnail window
export const getThumbnailImageURL = (imageURL) => {
    // TODO: surely there is a more legible way to do this
  return imageURL.replace(/upload\/()v1/gi, 'upload/w_114,h_80,c_fill/v1');
}

/**
* uploaded images on mobile are typically oriented incorrectly.
* loadImage corrects the image orientation.
* https://github.com/blueimp/JavaScript-Load-Image
*/
export const orientImage = (file, callback, options) => {
  window.loadImage(
    file,
    img => callback(img.toDataURL("image/png")),
    { ...options, orientation: true }, // Give a `maxWidth` to make it go faster
  );
}
