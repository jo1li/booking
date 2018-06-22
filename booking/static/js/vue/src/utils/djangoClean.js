/**
 * @param {String} value - string with possible value as none None'
 * @return {String} string with 'None' values removed
 */
export const removeNone = (value)  => {
    if (typeof value === 'string' && value === 'None') {
        return ''
    }

    return value;
};
