
import _ from 'lodash';

export function bindDomEvent(domSelector, eventType, callback) {

    const domElements = document.querySelectorAll(domSelector)
    const domElementsArray = Array.prototype.slice.call(domElements)

    const removeListeners = [];
    domElementsArray.forEach(element => {
        element.addEventListener(eventType, callback);
        removeListeners.push(() => element.removeEventListener(eventType, callback))
    })
    return () => removeListeners.forEach(removeCallBack => removeCallBack && removeCallBack());
}

/**
 * @param {HTMLElement} domNode
 * @return {Object} dom element attributes names as keys and attribute values
 * as object values.
 */
export function getDomAttributesAsProps(domNode) {
    const mappedKeys = _.mapKeys(domNode.attributes, value => value.nodeName)
    return  _.mapValues(mappedKeys, value => domNode.getAttribute(value.nodeName));
}