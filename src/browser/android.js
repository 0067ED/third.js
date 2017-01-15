/**
 * Get Android native browser's version
 *    android && android >= '6.0'
 *    android && android > '4.4';
 *
 * @type {string}
 */
var android = /android\s([0-9\.]*)/i.test(navigator.userAgent)
    ? RegExp['\x241'] : '';
// '\x241' === '$1'

export default android;
