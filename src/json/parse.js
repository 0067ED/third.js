import globalSandbox from '../sandbox/global';

var gsb = globalSandbox();
/**
 * JSON.parse
 * @param {string} data string
 * @return {*} JSON object
 */
var parse = gsb.parse || function (data) {
    if (typeof window.JSON === 'object' && typeof JSON.parse === 'function') {
        return JSON.parse(data);
    }

    return (new Function('return (' + data + ')'))();
};

export default parse;
