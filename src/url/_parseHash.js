/**
 * Parse hash
 *
 * @param {string} url URL location
 * @return {Array.<string>} match result.
 */
var parseHash = function (url) {
    return url.match(/(.*?)(#.*)/);
};

export default parseHash;
