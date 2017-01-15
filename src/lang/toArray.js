/**
 * Turn anything into array.
 * NOTE: Do not `Array.prototype.slice.call(arguments)`.
 *       To avoid modifying or passing arguments into other functions,
 *       it kills optimization.
 * https://github.com/loverajoel/jstips/blob/gh-pages/_posts/en/2016-01-31-avoid-modifying-or-passing-arguments-into-other-functions%E2%80%94it-kills-optimization.md
 *
 * @param {Object} object anything like array. (ducktype).
 * @param {number=} start start index.
 * @param {number=} end end index.
 * @return {Array} array.
 */
var toArray = function (object, start, end) {
    var len = object.length;

    if (len > 0) {
        end = end || len;
        start = start || 0;
        var arr = new Array(end - start);
        for (var i = start; i < end; i++) {
            arr[i] = object[i];
        }
        return arr;
    }
    return [];
};

export default toArray;
