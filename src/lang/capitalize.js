/**
 * capitalize
 *
 *      'aPPle' => 'Apple'
 *
 * @param {string} input input string.
 * @return {string} capitalized string.
 */
var capitalize = function (input) {
    input = String(input);
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
};

export default capitalize;
