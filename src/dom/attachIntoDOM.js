/**
 * Attach dom element into DOM tree.
 * @param {Element} element DOM element.
 * @param {Window=} win window context.
 */
var attachIntoDOM = function (element, win) {
    var doc = (win || window).document;
    var parent = (doc.body || doc.documentElement);
    // http://www.stevesouders.com/blog/2010/05/11/appendchild-vs-insertbefore/
    parent.insertBefore(element, parent.firstChild);
};

export default attachIntoDOM;
