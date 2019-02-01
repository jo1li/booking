import _ from 'lodash';

export function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => {
        if(object[key].isFile) {
            formData.append(key, object[key].blob, object[key].fileName);
        } else {
            formData.append(key, object[key]);
        }
    });
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
