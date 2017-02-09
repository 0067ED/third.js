import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';
import parseHash from './_parseHash';
import removeLastSplit from './_removeLastSplit';

/**
 * Remove query value
 *
 * @param {string} url URL location
 * @param {string} key key name
 * @return {string} replaced url
 */
var deleteQuery = function (url, key) {
    var oldUrl = url;
    var match = parseHash(url);
    var hash = '';
    if (match) {
        // url = 'http://baidu.com#hash' => 'http://baidu.com'
        url = match[1];
        hash = match[2];
    }

    if (!url) {
        // url = '#hash'
        return oldUrl;
    }

    var win = globalSandbox();
    var reg = new win.RegExp('(&|\\?)?' + escapeReg(win.encodeURIComponent(key)) + '=([^&]*)(?:&|$)', 'g');
    url = removeLastSplit(url.replace(reg, '$1'));
    return url + hash;
};

export default deleteQuery;
