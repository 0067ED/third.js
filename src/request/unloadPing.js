import ping from './ping';
import supportSendBeacon from '../detect/sendBeacon';

/**
 * Make super cors request for unload event.
 *
 * @param {string} url request url.
 * @param {Object|string|Array.<Object>} params data.
 * @param {Object} opts options
 * @param {string} opts.randomKey Add random query to make old IE not cache for img ping.
 *                                This is the cache key name. Default is 'z'.
 *                                If empty string then no random query.
 * @param {string} opts.transport Specify transport way. eg: img, xhr, beacon.
 */
var unloadPing = function (url, params, opts) {
    var ssb = supportSendBeacon();
    opts = opts || {};
    opts['transport'] = ssb ? 'beacon' : 'img';
    ping(url, params, opts);

    if (!ssb) {
        // dead loop for 200ms to make sure imgPing success.
        var end;
        var delay = 200;
        var now = +new Date();
        for (end = now + delay; now < end;) {
            now = +new Date();
        }
    }
};

export default unloadPing;
