import globalSandbox from '../sandbox/global';
import parseHash from './_parseHash';

/**
 * decodeURIComponent and replace '+' to ' '.
 *
 * @param {string} value query value.
 * @return {string} value or empty string.
 */
var decodeQuery = function (value) {
    var win = globalSandbox();
    // replacing addition symbol with a space
    value = value.replace(/\+/g, ' ');
    // decodeURIComponent
    return win.decodeURIComponent(value);
};

export default decodeQuery;
