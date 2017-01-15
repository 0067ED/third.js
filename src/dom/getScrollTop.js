/**
 * Get page scroll top
 * @param {Window=} win window context.
 * @return {number} scroll top.
 */
var getScrollTop = function (win) {
    win = win || window;
    var doc = win.document;
    return win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
};

export default getScrollTop;
