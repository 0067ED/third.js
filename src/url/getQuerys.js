import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';
import parseHash from './_parseHash';
import decodeQuery from './decodeQuery';

/**
 * Get all querys value.
 *
 * @param {string} url URL location
 * @return {Object.<string, string|Array.<string>>} all querys.
 */
var getQuerys = function (url) {
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
    var reg = /(?:&|\?)?([^\?&]+)=([^&]*)(?:&|$)/g;
    var result = {};
    while (match = reg.exec(url)) {
        var key = decodeQuery(match[1]);
        var value = decodeQuery(match[2]);
        var oldValue = result[key];
        if (typeof oldValue === 'string') {
            result[key] = [oldValue];
            result[key][1] = value;
        }
        else if (oldValue) {
            // oldValue is Array.<string>
            oldValue[oldValue.length] = value;
        }
        else {
            result[key] = value;
        }
    }

    return result;
};

export default getQuerys;
