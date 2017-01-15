/**
 * Get IE browser's version
 *    ie === '6'
 *    ie && ie > 7
 *
 * @type {string}
 */
var ie = /msie (\d+\.\d+)/i.test(navigator.userAgent)
    ? ((document.documentMode + '') || RegExp['\x241']) : '';
// '\x241' === '$1'

export default ie;
