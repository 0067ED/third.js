/**
 * Get page scroll left
 * @param {Window=} win window context.
 * @return {number} scroll top.
 */
var getScrollLeft = function (win) {
    win = win || window;
    var doc = win.document;
    return win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
};

export default getScrollLeft;
