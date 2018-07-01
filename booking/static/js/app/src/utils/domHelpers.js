
export function bindDomEvent(domId, eventType, callback) {
    const domElement = document.getElementById(domId)
    domElement.addEventListener(eventType, callback);
    return () => domElement.removeEventListener(eventType, callback);
}