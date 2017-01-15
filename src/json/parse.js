/**
 * JSON.parse
 * @param {string} data string
 * @return {*} JSON object
 */
var parse = function (data) {
    if (typeof window.JSON === 'object' && typeof JSON.parse === 'function') {
        return JSON.parse(data);
    }

    return (new Function('return (' + data + ')'))();
};

export default parse;
