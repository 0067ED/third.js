/**
 * detect if page is only for preview. (Safari top sites view.)
 * @param {Window=} win window object.
 * @return {boolean} in prerender status or not.
 */
var isPreviewLoad = function (win) {
    win = win || window;
    var api = 'navigator';
    return win[api] && win[api].loadPurpose === 'preview';
};

export default isPreviewLoad;
