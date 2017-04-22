import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';

/**
 * Get raw cookie value.
 *
 * @param {string} key key name.
 * @param {Object=} options options.
 * @param {Window=} options.context window context.
 * @return {Array.<string>} cookie value array.
 */
var getRaw = function (key, options) {
    var win = (options && options.context) || window;
    var result = [];
    var cookies = win.document.cookie.split(';');
    var regex = new RegExp('^\\s*' + escapeReg(key) + '=\\s*(.*?)\\s*$');
    for (var i = 0; i < cookies.length; i++) {
        var r = cookies[i].match(regex);
        if (r) {
            result[result.length] = globalSandbox().decodeURIComponent(r[1]);
        }
    }
    return result;
};

export default getRaw;
