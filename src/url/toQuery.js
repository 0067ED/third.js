import type from '../lang/type';
import globalSandbox from '../sandbox/global';

/**
 * json => params
 * @param {Object} json params object
 * @return {string}
 */
var toQuery = function (json) {
    if (!json) {
        return '';
    }

    var s = [];
    var rbracket = /\[\]$/;
    var encode = globalSandbox().encodeURIComponent;
    var add = function (k, v) {
        v = typeof v === 'function' ? v() : v == null ? '' : v;
        s[s.length] = encode(k) + '=' + encode(v);
    };
    var buildParams = function (prefix, obj) {
        var i;
        var key;
        var l;

        switch (type(obj)) {
            case 'array':
                if (prefix) {
                    for (i = 0, l = obj.length; i < l; i++) {
                        if (rbracket.test(prefix)) {
                            add(prefix, obj[i]);
                        }
                        else {
                            var subKey = type(obj[i]) === 'object' ? i : '';
                            buildParams(prefix + '[' + subKey + ']', obj[i]);
                        }
                    }
                }
                else {
                    for (i = 0, l = obj.length; i < l; i++) {
                        buildParams(obj[i]['key'], obj[i]['value']);
                    }
                }
                break;
            case 'object':
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        buildParams(prefix ? (prefix + '[' + key + ']') : key, obj[key]);
                    }
                }
                break;
            default:
                // stringify
                obj = '' + obj;
                if (prefix) {
                    add(prefix, obj);
                }
                else {
                    s[s.length] = obj;
                }
                break;
        }
        return s;
    };

    return buildParams('', json).join('&').replace(/%20/g, '+');
};

export default toQuery;
