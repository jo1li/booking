import _ from 'lodash';

export function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

export function filterUndefined(object) {
    return _.reduce(object, (newObj, value, key) => {
        if (!_.isNil(value)) {
            newObj[key] = value;
        }
        return newObj;
    }, {})
}

/**
 * @param {File} file - file object
 * @return {Promise} resolves to a data url
 */
export const geGetImageFiletPreview = file => {
  if (!file) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onabort = () => resolve('file reading was aborted');
    reader.onerror = () => reject('file reading has failed');
    reader.readAsDataURL(file);
  })
}