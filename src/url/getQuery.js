import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';
import parseHash from './_parseHash';
import decodeQuery from './decodeQuery';

/**
 * Get first query value of url
 *
 * @param {string} url URL location
 * @param {string} key key name
 * @return {string|Array.<string>} value or empty string.
 */
var getQuery = function (url, key) {
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
    var reg = new win.RegExp('(?:&|\\?)?' + escapeReg(win.encodeURIComponent(key)) + '=([^&]*)(?:&|$)', 'g');
    var result = [];
    while (match = reg.exec(url)) {
        result.push(decodeQuery(match[1]));
    }

    return result.length <= 1 ? (result[0] || '') : result;
};

export default getQuery;
