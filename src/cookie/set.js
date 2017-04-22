import getDomainAndPathCount from './_getDomainAndPathCount';
import setRaw from './setRaw';

/**
 * Set cookie.
 * @param {string} key cookie name.
 * @param {string|number} value cookie value.
 * @param {Object=} options options.
 * @param {Window=} options.context window context.
 * @param {number=} options.expires cookie expired time in milliseconds.
 * @param {string=} options.domain cookie domain.
 * @param {string=} options.path cookie path.
 * @return {boolean} success or not.
 */
var set = function (key, value, options) {
    var domainAndPathCount = getDomainAndPathCount(options);
    value = value + '';
    return setRaw(key, domainAndPathCount + value.replace(/\-/g, '%2d'), options);
};

export default set;
