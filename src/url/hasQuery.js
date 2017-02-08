import escapeReg from '../lang/escapeReg';
import globalSandbox from '../sandbox/global';

/**
 * Has query or not.
 *
 * @param {string} url URL location.
 * @param {string} key key name.
 * @return {boolean} has this query or not.
 */
var hasQuery = function (url, key) {
    var win = globalSandbox();
    var reg = new win.RegExp('(?:&|\\?)?' + escapeReg(win.encodeURIComponent(key)) + '=([^&]*)(?:&|$)', '');
    return reg.test(url);
};

export default hasQuery;
