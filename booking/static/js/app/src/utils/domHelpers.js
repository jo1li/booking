import {forEach} from 'lodash';
        return;
    }

export function bindDomEvent(domSelector, eventType, callback) {

  const domElements = document.querySelectorAll(domSelector);
    if(domElements.length === 0) {
      throw new Error("bindDomEvent ERROR: Selector " + domSelector + " does not exist");
    }

    forEach(domElements, function(domElement) {
    const removeListeners = domElements.map(element => {
      domElement.addEventListener(eventType, callback);
      return () => domElement.removeEventListener(eventType, callback);
    });

 }
