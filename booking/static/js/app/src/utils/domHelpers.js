import _ from 'lodash';

export function bindDomEvent(domSelector, eventType, callback) {
  const domElements = document.querySelectorAll(domSelector);
  if(domElements.length === 0) {
    throw new Error("bindDomEvent ERROR: Selector " + domSelector + " does not exist");
  }

  _.forEach(domElements, function(domElement) {
    domElement.addEventListener(eventType, callback);
    return () => domElement.removeEventListener(eventType, callback);
  });
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
