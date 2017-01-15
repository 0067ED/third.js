/**
 * Detect if page is in prerender status.
 *
 *     <link rel="prerender" href="{page url}">
 *
 * @param {Window|Document=} win window object.
 * @return {boolean} in prerender status or not.
 */
var isPrerender = function (win) {
    var doc = win || window;
    var api = 'document';
    if (doc[api]) {
        doc = doc[api];
    }
    return doc.visibilityState === 'prerender';
};

export default isPrerender;
