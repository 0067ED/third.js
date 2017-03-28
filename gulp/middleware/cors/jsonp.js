var url = require('url');

module.exports = function ping(callback, opts) {
    opts = opts || {};
    var callbackNameKey = opts.callback || 'callback';
    var encoding = opts.encoding || 'utf-8';
    return function (req, res, next) {
        // no cache for ping request
        res.setHeader('Cache-Control', 'private, max-age=0, no-cache');
        res.setHeader('Pragma', 'no-cache');
        // js file
        res.setHeader('Content-Type', `application/javascript; charset=${encoding}`);

        var urlParts = url.parse(req.url);
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

        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(result)
        });
        res.end(result);
        next();
    };
};
