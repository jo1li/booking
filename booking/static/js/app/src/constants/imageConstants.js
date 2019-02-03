// Reasonable max size for most images we need to manipulate after loading -
// using this can prevent failures to render on mobile.
export const MAX_LOADED_IMAGE_WIDTH = 1200;
// Sometimes we need the ratio numerator and denominator exactly
// TODO: import this wherever we are using this aspect ratio
export const PROFILE_PHOTO_ASPECT_RATIO = 25 / 16;
