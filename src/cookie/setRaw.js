import getRaw from './getRaw';
import globalSandbox from '../sandbox/global';

/**
 * Set raw cookie.
 *
 * @param {string} key cookie name.
 * @param {string|number} value cookie value.
 * @param {Object=} options options.
 * @param {Window=} options.context window context.
 * @param {number=} options.expires cookie expired time in milliseconds.
 * @param {string=} options.domain cookie domain.
 * @param {string=} options.path cookie path.
 * @return {boolean} success or not.
 */
var setRaw = function (key, value, options) {
    var win = (options && options.context) || window;
    value = value + '';
    value = globalSandbox().encodeURIComponent(value);
    var newCookie = key + '=' + value + '; ';

    if (options && options.path != null) {
        newCookie += 'path=' + options.path + '; ';
    }

    if (options && options.expires != null) {
        var date = new Date();
        date.setTime(date.getTime() + options.expires);
        newCookie += 'expires=' + date.toGMTString() + '; ';
    }

    if (options && options.domain != null) {
        newCookie += 'domain=' + options.domain + ';';
    }

    var doc = win.document;
    var oldCookie = doc.cookie;
    doc.cookie = newCookie;

    if (oldCookie === doc.cookie) {
        var values = getRaw(key);
        for (var i = 0; i < values.length; i++) {
            if (value === values[i]) {
                return true;
            }
        }
        return false;
    }

    return true;
};

export default setRaw;
