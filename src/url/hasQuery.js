import escapeReg from '../lang/escapeReg';

/**
 * Has query or not.
 *
 * @param {string} url URL location.
 * @param {string} key key name.
 * @return {boolean} has this query or not.
 */
var hasQuery = function (url, key) {
    var reg = new RegExp('(^|&|\\?|#)' + escapeReg(key) + '=([^&#]*)(&|$|#)', '');
    return reg.test(url);
};

export default hasQuery;
