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
