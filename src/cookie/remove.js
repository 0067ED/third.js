import set from './set';

/**
 * Remove cookie.
 * @param {string} key cookie name.
 * @param {Window=} win window context.
 * @param {string} domain cookie domain.
 * @param {string} path cookie path.
 * @return {boolean} success or not.
 */
var remove = function (key, win, domain, path) {
    var expires = new Date(0);
    return set(key, '', win, expires, domain, path);
};

export default remove;
