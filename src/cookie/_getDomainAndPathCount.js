
import getDomainCount from './_getDomainCount';
import getPathCount from './_getPathCount';

/**
 * Get domain and path count string.
 *      domainCount + '-' + pathCount + '$'
 *
 * @param {Object=} options options.
 * @param {Window=} options.context window context.
 * @param {string=} options.domain cookie domain.
 * @param {string=} options.path cookie path.
 * @return {string} count string.
 */
var getDomainAndPathCount = function (options) {
    var win = (options && options.context) || window;
    var domain = options && options.domain;
    var path = options && options.path;

    var location = win.location;
    var pathCount = getPathCount(path != null ? path : location.pathname);
    var domainCount = getDomainCount(domain != null ? domain : location.hostname);
    return domainCount + (pathCount > 1 ? '-' + pathCount : '') + '-';
};

export default getDomainAndPathCount;
