/**
 * Get height of web page.
 * @param {Window=} win window context.
 * @return {number} page width.
 */
var getPageHeight = function (win) {
    win = win || window;
    var doc = win.document;
    var body = doc.body;
    var de = doc.documentElement;
    var client = doc.compatMode === 'BackCompat' ? body : doc.documentElement;

    return Math.max(de.scrollHeight, body.scrollHeight, client.clientHeight);
};

export default getPageHeight;
