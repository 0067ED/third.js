import createIframeByHTML from '../iframe/createByHTML';

/**
 * Create an sandbox by iframe, then load javascript files.
 * @param {string|Array.<string>} jsfiles javascript code string.
 * @param {function(window, document)} callback callback.
 * @param {string=} charset charset, default is none.
 * @return {Element} iframe element.
 */
export default function (jsfiles, callback, charset) {
    charset = charset ? ('charset="' + charset + '"') : '';
    var html = '';
    for (var i = 0, l = jsfiles.length; i < l; i++) {
        html += '<script' + charset + ' src="' + jsfiles[i] + '"></script>';
    }
    return createIframeByHTML(html, callback);
};
