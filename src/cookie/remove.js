import set from './set';

/**
 * Remove cookie.
 * @param {string} key cookie name.
 * @param {Object=} options options.
 * @param {Window=} options.context window context.
 * @param {string=} options.domain cookie domain.
 * @param {string=} options.path cookie path.
 * @return {boolean} success or not.
 */
var remove = function (key, options) {
    return set(key, '', {
        context: options && options.context,
        expires: new Date(0),
        domain: options && options.domain,
        path: options && options.path
    });
};

export default remove;
