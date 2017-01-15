import uuid from '../lang/uuid';

var TEST_COOKIE_NAME = 'S3COOKIENAME' + uuid();
/**
 * detect cookie support
 * copy from https://github.com/Modernizr/Modernizr/blob/33f00fbbeb12e92bf24711ea386e722cce6f60cc/feature-detects/cookies.js
 * @return {boolean} support or not.
 */
var cookie = function () {
    var cookie = 'cookie';
    var doc = window.document;
    // Quick test if browser has cookieEnabled host property
    if (window.navigator.cookieEnabled) {
        return true;
    }
    // Create cookie
    doc[cookie] = TEST_COOKIE_NAME + '=1';
    var ret = doc[cookie].indexOf(TEST_COOKIE_NAME + '=') !== -1;
    // Delete cookie
    doc[cookie] = TEST_COOKIE_NAME + '=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return ret;
};

export default cookie;
