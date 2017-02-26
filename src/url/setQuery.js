import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';
import parseHash from './_parseHash';
import removeLastSplit from './_removeLastSplit';
import isArray from '../lang/isArray';

/**
 * Set query value of url
 *
 * @param {string} url URL location
 * @param {string} key key name
 * @param {string|Array.<string>} value value string
 * @return {string} new url string
 */
var setQuery = function (url, key, value) {
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
    key = win.encodeURIComponent(key);
    var values = isArray(value) ? value : [value];
    var valueLength = values.length;
    var reg = new win.RegExp('(&|\\?)?(' + escapeReg(key) + '=)([^&]*)(&|$)', 'g');
    var i = 0;
    url = url.replace(reg, function ($0, $1, $2, $3, $4) {
        $1 = $1 || '';
        if (i < valueLength) {
            var v = win.encodeURIComponent(values[i]);
            i++;
            return $1 + $2 + v + $4;
        }

        return $1;
    });
    url = removeLastSplit(url);

    if (i < valueLength) {
        url += url.indexOf('?') >= 0 ? '&' : '?';
    }
    while (i < valueLength) {
        url += key + '=' + win.encodeURIComponent(values[i]);
        i++;
        if (i < valueLength) {
            url += '&';
        }
    }

    return url + hash;
};

export default setQuery;
