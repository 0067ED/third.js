import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';

/**
 * Get query value of url
 *
 * @param {string} url URL location
 * @param {string} key key name
 * @return {string} value or empty string.
 */
var getQuery = function (url, key) {
    var reg = new RegExp('(^|&|\\?|#)' + escapeReg(key) + '=([^&#]*)(&|$|#)', '');
    var match = url.match(reg);
    if (match && match[2]) {
        return globalSandbox().decodeURIComponent(match[2]);
    }

    return '';
};

export default getQuery;
