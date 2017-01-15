import getDomainAndPathCount from './_getDomainAndPathCount';
import setRaw from './setRaw';

/**
 * Set cookie.
 * @param {string} key cookie name.
 * @param {string|number} value cookie value.
 * @param {Window=} win window context.
 * @param {number=} expires cookie expired time in milliseconds.
 * @param {string=} domain cookie domain.
 * @param {string=} path cookie path.
 * @return {boolean} success or not.
 */
var set = function (key, value, win, expires, domain, path) {
    var domainAndPathCount = getDomainAndPathCount(win, domain, path);
    value = value + '';
    return setRaw(key, domainAndPathCount + value.replace(/\-/g, '%2d'), win, expires, domain, path);
};

export default set;
