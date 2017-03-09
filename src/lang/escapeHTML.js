/**
 * escape HTML string
 *
 * @param {string} input input string.
 * @return {string} escaped string.
 */
var escapeHTML = function (input) {
    return String(input)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

export default escapeReg;
