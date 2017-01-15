/**
 * Made create RegExp Object easier.
 *
 *     new RegExp('^\\s*' + escapeReg('[a]') + '=\\s*(.*?)\\s*$', 'g')
 *
 * @param {string} input input string.
 * @return {string} escaped string.
 */
var escapeReg = function (input) {
    return String(input).replace(new RegExp('([.*+?^=!:${}()|[\\]\/\\\\-])', 'g'), '\\$1');
};

export default escapeReg;
