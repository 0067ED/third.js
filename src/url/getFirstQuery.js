import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';
import parseHash from './_parseHash';
import decodeQuery from './decodeQuery';

/**
 * Get first query value of url
 *
 * @param {string} url URL location
 * @param {string} key key name
 * @return {string} value or empty string.
 */
var getFirstQuery = function (url, key) {
    var match = parseHash(url);
    if (match) {
        // url = 'http://baidu.com#hash' => 'http://baidu.com'
        url = match[1];
    }

    if (!url) {
        // url = '#hash'
        return '';
    }

    var win = globalSandbox();
    var reg = new win.RegExp('(?:&|\\?)?' + escapeReg(win.encodeURIComponent(key)) + '=([^&]*)(?:&|$)', '');

    match = url.match(reg);
    if (match && match[1]) {
        return decodeQuery(match[1]);
    }

    return '';
};

export default getFirstQuery;
