import uuid from '../lang/uuid';
import toQuery from '../url/toQuery';
import hasSendBeacon from '../detect/sendBeacon';
import hasCors from '../detect/cors';
import globalSandbox from '../sandbox/global';
import xhrRequest from './_xhr';

/**
 * Build params.
 *
 * @param {Object|string|Array.<Object>} params data.
 * @param {Object} opts options
 * @param {string} opts.randomKey Add random query to make old IE not cache for img ping.
 *                                This is the cache key name. Default is 'z'.
 *                                If empty string then no random query.
 * @return {string} a=1&b=3&z=23
 */
var buildParams = function (params, opts) {
    if (typeof params !== 'string') {
        params = toQuery(params);
    }
    var randomKey = opts && opts['randomKey'];
    randomKey = randomKey == null ? 'z' : randomKey;

    if (randomKey) {
        var randomQuery = randomKey + '=' + uuid();
        params += (params ? '&' : '') + randomQuery;
    }

    return params;
};

/**
 * Image Ping
 * @param {string} url request url.
 * @param {string} params data.
 * @param {function(Error=)=} callback callback.
 * @param {number} timeout timeout.
 * @return {boolean}
 */
var imgPing = function (url, params, callback) {
    var concatUrl = [url, params].join(url.indexOf('?') >= 0 ? '&' : '?');
    var key = 'THIRDPING_IMG' + uuid();
    var img = new Image();
    window[key] = img;
    var done = function (errorText) {
        img.onload = img.onerror = img.onabort = null;
        window[key] = null;
        img = null;
        if (callback) {
            var error = null;
            if (errorText) {
                error = new Error();
                error.name = 'ImgPing' + errorText;
            }
            callback(error);
        }
    };
    img.onload = function () {
        done();
    };
    img.onerror = function () {
        done('Error');
    };
    img.onabort = function () {
        done('Abort');
    };

    img.src = concatUrl;
    return true;
};

/**
 * Beacon Ping
 * @param {string} url request url.
 * @param {string} params data.
 * @return {boolean} can send beacon or not
 */
var beaconPing = function (url, params) {
    return hasSendBeacon() && globalSandbox().navigator.sendBeacon(url, params);
};

/**
 * Xhr Ping
 * @param {string} url request url.
 * @param {string} params data.
 * @param {function(Error=)=} callback callback.
 * @return {boolean} can cross origin xhr or not
 */
var xhrPing = function (url, params, callback) {
    if (hasCors() !== 'xhr') {
        return false;
    }

    xhrRequest(url, params, callback);
    return true;
};

/**
 * If url and params are not too long for IE.
 * @param {string} url request url.
 * @param {string} origin url origin, eg: http://example.com:8888
 * @param {string} params data.
 * @return {boolean} to long.
 */
var tooLongForIE = function (url, origin, params) {
    // plus '?'
    var allLength = url.length + params.length + 1;
    // https://support.microsoft.com/en-us/kb/208427
    // IE(<= 8) Maximum URL length is 2,083 characters.
    // Maximum path length is 2,048 characters.
    // IE9 is more longer, but still has limit.
    return (allLength > 2083) && ((allLength - origin.length) > 2048);
};

/**
 * Make cors request.
 * Method Priorit:
 *      1. img ping if ur length <= 2083
 *      2. sendBeacon
 *      3. XMLHttpRequest withCredentials
 *
 * @param {string} url request url.
 * @param {Object|string|Array.<Object>} params data.
 * @param {Object=} opts options
 * @param {string=} opts.randomKey Add random query to make old IE not cache for img ping.
 *                                This is the cache key name. Default is 'z'.
 *                                If empty string then no random query.
 * @param {string=} opts.transport Specify transport way. eg: img, xhr, beacon.
 * @param {function(Error=)=} opts.callback callback function when ping done.
 *                                         only work for xhr and img ping.
 * @return {boolean} sended or not.
 */
var ping = function (url, params, opts) {
    params = buildParams(params, opts);

    var r = url.match(/(?:https?|ftp):\/\/[^\/]+/);
    if (!r) {
        throw new Error('URL: "' + url + '" not absolute url.');
    }
    var origin = r[0];

    var transport = opts && opts['transport'];
    var callback = opts && opts['callback'];
    if (transport === 'img') {
        return imgPing(url, params, callback);
    }

    if (transport === 'xhr') {
        return xhrPing(url, params, callback);
    }

    if (transport === 'beacon') {
        return beaconPing(url, params);
    }

    if (!tooLongForIE(url, origin, params)) {
        return imgPing(url, params, callback);
    }

    if (!callback && beaconPing(url, params)) {
        return true;
    }

    if (xhrPing(url, params, callback)) {
        return true;
    }

    // even it's too long
    // still use img ping, send as much data as browser can.
    return imgPing(url, params, callback);
};

export default ping;
