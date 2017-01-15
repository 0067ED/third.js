import getDomainAndPathCount from './_getDomainAndPathCount';
import getRaw from './getRaw';

/**
 * Get cookie value.
 *
 * @param {string} key key name.
 * @param {Window=} win window context.
 * @param {string=} domain cookie domain.
 * @param {string=} path cookie path.
 * @return {string} cookie value.
 */
var get = function (key, win, domain, path) {
    var results = getRaw(key, win);
    var domainAndPathCount = getDomainAndPathCount(win, domain, path);
    for (var i = 0; i < results.length; i++) {
        var r = results[i];
        if (r.indexOf(domainAndPathCount) === 0) {
            return r.slice(domainAndPathCount.length).replace(/%2d/g, '-');
        }
    }
    return '';
};

export default get;
