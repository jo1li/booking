import _ from 'lodash';


const URL_OPTIONS = {
  width: (number) => `w_${number}`,
  height: (number) => `h_${number}`,
  limit: () => 'c_limit',
  fill: () => 'c_fill',
  face: () => 'g_face',
  thumbnail: () => 'c_thumb',
  autoOriented: () => 'a_auto',
}

const getCloudinaryURL = (imageURL, options) => {
  const urlOptions = _.map(options, (value, key) => URL_OPTIONS[key](value));
  const urlOptionsString = urlOptions.join(',')
  // TODO: surely there is a more legible way to do this
  return imageURL.replace(/upload\/()v1/gi, `upload/${urlOptionsString}/v1`);
}

// Returns a function for getting a URL for an image with width no greater than
// the provided value in px
export const getMaxSizeImageURL = (imageURL, {maxWidth, maxHeight}) => (
  getCloudinaryURL(imageURL, {width: maxWidth, height: maxHeight, limit: true})
);

// Gets a cloudinary URL for an image that will fill a 114px x 80px thumbnail window
export const getOpusThumbnailImageURL = (imageURL) => (
  getCloudinaryURL(imageURL, {width: 114, height: 80, fill: true})
);

// Gets the cloudinary default thumnail image URL, which orients the image
// and helps with data/rendering
export const getThumbnailImageURL = (imageURL) => (
  getCloudinaryURL(imageURL, {thumbnail: true, width: 42, height: 32})
);

// Gets the cloudinary image URL with an auto-orientation transformation
// NB This doesn't seem to be necessary if any other transformation config is
// present in the URL.
export const getOrientedImageURL = (imageURL) => (
  getCloudinaryURL(imageURL, {autoOriented: true})
);

/**
* uploaded images on mobile are typically oriented incorrectly.
* loadImage corrects the image orientation.
* loadImage is located in load-image.all.min.js in booking/static/js/
* https://github.com/blueimp/JavaScript-Load-Image
*/
export const orientImage = (file, callback, options) => {
  window.loadImage(
    file,
    img => callback(img.toDataURL("image/png")),
    { ...options, orientation: true }, // Give a `maxWidth` to make it go faster
  );
}
