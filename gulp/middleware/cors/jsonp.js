var url = require('url');
var iconv = require('iconv-lite');

module.exports = function ping(callback, opts) {
    opts = opts || {};
    var callbackNameKey = opts.callbackKey || 'callback';
    var encodingKey = opts.encodingKey || 'encoding';
    var defaultEncoding = opts.encoding || 'utf-8';
    if (!iconv.encodingExists(defaultEncoding)) {
        throw new Error(`[CORS] Encoding "${defaultEncoding}" is not supported.`);
    }

    return function (req, res, next) {
        var urlParts = url.parse(req.url);
        var encoding = urlParts.query[encodingKey] || defaultEncoding;
        if (!iconv.encodingExists(encoding)) {
            encoding = defaultEncoding;
        }

        // no cache for ping request
        res.setHeader('Cache-Control', 'private, max-age=0, no-cache');
        res.setHeader('Pragma', 'no-cache');
        // js file
        res.setHeader('Content-Type', `application/javascript; charset=${encoding}`);

        var callbackName = urlParts.query[callbackNameKey];
        var result = callback(req, res);
        if (result == null) {
            result += '';
        }
        else if (typeof result !== 'string') {
            // stringify object, array and other thing
            result = JSON.stringify(result);
        }

        if (callbackName) {
            result = `${callbackName}(${result})`;
        }

        var resultBuffer = iconv.encode(result, encoding);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(resultBuffer)
        });
        res.end(resultBuffer);
        next();
    };
};
