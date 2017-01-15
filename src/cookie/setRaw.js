import getRaw from './getRaw';
import globalSandbox from '../sandbox/global';

/**
 * Set raw cookie.
 *
 * @param {string} key cookie name.
 * @param {string} value cookie value.
 * @param {Window=} win window context.
 * @param {number=} expires cookie expired time in milliseconds.
 * @param {string=} domain cookie domain.
 * @param {string=} path cookie path.
 * @return {boolean} success or not.
 */
var setRaw = function (key, value, win, expires, domain, path) {
    win = win || window;
    value = globalSandbox().encodeURIComponent(value);
    var newCookie = key + '=' + value + '; ';

    if (path != null) {
        newCookie += 'path=' + path + '; ';
    }

    if (expires != null) {
        var date = new Date();
        date.setTime(date.getTime() + expires);
        newCookie += 'expires=' + date.toGMTString() + '; ';
    }

    if (domain != null) {
        newCookie += 'domain=' + domain + ';';
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
