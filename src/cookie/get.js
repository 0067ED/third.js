import getDomainAndPathCount from './_getDomainAndPathCount';
import getRaw from './getRaw';

/**
 * Get cookie value.
 *
 * @param {string} key key name.
 * @param {Object=} options options.
 * @param {Window=} options.context window context.
 * @param {string=} options.domain cookie domain.
 * @param {string=} options.path cookie path.
 * @return {string} cookie value.
 */
var get = function (key, options) {
    var results = getRaw(key, options);
    var domainAndPathCount = getDomainAndPathCount(options);
    for (var i = 0; i < results.length; i++) {
        var r = results[i];
        if (r.indexOf(domainAndPathCount) === 0) {
            return r.slice(domainAndPathCount.length).replace(/%2d/g, '-');
        }
    }
    return '';
};

export default get;
