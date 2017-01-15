
import getDomainCount from './_getDomainCount';
import getPathCount from './_getPathCount';

/**
 * Get domain and path count string.
 *      domainCount + '-' + pathCount + '$'
 *
 * @param {Window=} win window context.
 * @param {string=} domain cookie domain.
 * @param {string=} path cookie path.
 * @return {string} count string.
 */
var getDomainAndPathCount = function (win, domain, path) {
    win = win || window;

    var location = win.location;
    var pathCount = getPathCount(path != null ? path : location.pathname);
    var domainCount = getDomainCount(domain != null ? domain : location.hostname);
    return domainCount + (pathCount > 1 ? '-' + pathCount : '') + '-';
};

export default getDomainAndPathCount;
