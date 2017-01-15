var class2type = {
    'Boolean': 1,
    'Number': 1,
    'String': 1,
    'Function': 1,
    'Array': 1,
    'Date': 1,
    'RegExp': 1,
    'Object': 1,
    'Error': 1
};
var toString = Object.prototype.toString;

/**
 * Get the type of input.
 *
 * @param {Object} object .
 * @return {string} type .
 */
var type = function (object) {
    if (object == null) {
        return String(object);
    }


    // Support: Safari <= 5.1 (functionish RegExp)
    var t = typeof object;
    var objType = 'object';
    if (t === objType || t === 'function') {
        t = toString.call(object).slice(8, -1);
        return class2type[t] ? t.toLowerCase() : objType;
    }

    return typeof object;
};

export default type;
