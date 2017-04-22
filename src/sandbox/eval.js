import createIframeByHTML from '../iframe/createByHTML';
import typeOf from '../lang/type';

/**
 * Create an sandbox by iframe, then eval javascript code.
 * @param {string|Function} js javascript code string or javascript function.
 *                             NOTE: function has no context.
 * @param {function(window, document)} callback callback.
 * @param {string=} charset charset, default is utf-8.
 * @return {Element} iframe element.
 */
export default function (js, callback, charset) {
    if (typeOf(js) === 'function') {
        // is function.
        js = '(' + js.toString() + ')()';
    }
    charset = ' charset="' + (charset || 'utf-8') + '"';
    return createIframeByHTML('<script' + charset + '>' + js + '</script>', callback);
};
