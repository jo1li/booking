/**
 * This is to detect what browser is currently being used.
 * Not my favorite approach to make behavior specific to a browser.
 * Using this should be avoided.
 */
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);