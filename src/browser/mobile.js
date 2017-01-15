var ua = window.navigator.userAgent;

/**
 * Is mobile device or not.
 * @type {boolean}
 */
export default /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(ua);
