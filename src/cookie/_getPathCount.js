/**
 * normalize path
 * normalizePath('') === '/'
 * normalizePath('/') === '/'
 * normalizePath('/ping') === '/ping'
 * normalizePath('/ping/pv') === '/ping/pv'
 * normalizePath('ping/pv') === '/ping/pv'
 * normalizePath('ping/pv/') === '/ping/pv'
 *
 * @param {string} path path
 * @return {string} path
 */
var normalizePath = function (path) {
    if (!path) {
        return '/';
    }

    if (path.length > 1 && path.lastIndexOf('/') === path.length - 1) {
        // remove last '/'
        path = path.substr(0, path.length - 1);
    }

    if (path.indexOf('/') !== 0) {
        // fill up first '/'
        path = '/' + path;
    }

    return path;
};

/**
 * get count of path
 * getPathCount('') === 1
 * getPathCount('/') === 1
 * getPathCount('/ping') === 2
 * getPathCount('/ping/pv') === 3
 * getPathCount('ping/pv') === 3
 * getPathCount('ping/pv/') === 3
 *
 * @param {string} path path
 * @return {number} count of path
 */
var getPathCount = function (path) {
    path = normalizePath(path);
    return path === '/' ? 1 : path.split('/').length;
};

export default getPathCount;
