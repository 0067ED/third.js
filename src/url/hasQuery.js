import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';
import parseHash from './_parseHash';

/**
 * Has query or not.
 *
 * @param {string} url URL location.
 * @param {string} key key name.
 * @return {boolean} has this query or not.
 */
var hasQuery = function (url, key) {
    var match = parseHash(url);
    if (match) {
        // url = 'http://baidu.com#hash' => 'http://baidu.com'
        url = match[1];
    }

    if (!url) {
        // url = '#hash'
        return false;
    }

    var win = globalSandbox();
    var reg = new win.RegExp('(?:&|\\?)?' + escapeReg(win.encodeURIComponent(key)) + '=([^&]*)(?:&|$)', '');
    return reg.test(url);
};

export default hasQuery;
