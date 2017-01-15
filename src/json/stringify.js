/**
 * JSON.stringify
 * @param {*} value JSON object
 * @return {string} JSON string
 */
var stringify = (function () {
    /**
     * 字符串处理时需要转义的字符表
     * @private
     */
    var escapeMap = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    };

    /**
     * encode string
     * @param {string} source source string.
     * @return {string}
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g,
                function (match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }

    /**
     * encode array
     * @param {Array} source source.
     * @return {string}
     */
    function encodeArray(source) {
        var result = ['['];
        var l = source.length;
        var preComma;
        var i;
        var item;

        for (i = 0; i < l; i++) {
            item = source[i];

            switch (typeof item) {
                case 'undefined':
                case 'function':
                case 'unknown':
                    break;
                default:
                    if (preComma) {
                        result.push(',');
                    }
                    result.push(stringify(item));
                    preComma = 1;
            }
        }
        result.push(']');
        return result.join('');
    }

    // left-pad
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }

    /**
     * encode date
     * @param {Date} source source.
     * @return {string}
     */
    function encodeDate(source) {
        return '"' + source.getFullYear() + '-' + pad(source.getMonth() + 1)
            + '-' + pad(source.getDate()) + 'T' + pad(source.getHours()) + ':'
            + pad(source.getMinutes()) + ':' + pad(source.getSeconds()) + '"';
    }

    return function (value) {
        switch (typeof value) {
            case 'undefined':
                return 'undefined';

            case 'number':
                return isFinite(value) ? String(value) : 'null';

            case 'string':
                return encodeString(value);

            case 'boolean':
                return String(value);

            default:
                if (value === null) {
                    return 'null';
                }
                else if (value instanceof Array) {
                    return encodeArray(value);
                }
                else if (value instanceof Date) {
                    return encodeDate(value);
                }

                var result = ['{'];
                var encode = stringify;
                var preComma;
                var item;

                for (var key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        item = value[key];
                        switch (typeof item) {
                            case 'undefined':
                            case 'unknown':
                            case 'function':
                                break;
                            default:
                                if (preComma) {
                                    result.push(',');
                                }
                                preComma = 1;
                                result.push(encode(key) + ':' + encode(item));
                        }
                    }
                }
                result.push('}');
                return result.join('');
        }
    };
})();

module.export = stringify;
