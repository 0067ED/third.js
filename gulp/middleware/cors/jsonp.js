const qs = require('qs');
const url = require('url');
const iconv = require('iconv-lite');
const LOG_PREFIX = '[third-server][jsonp]';

module.exports = (callback, opts) => {
    opts = opts || {};
    const callbackNameKey = opts.callbackKey || 'callback';
    const encodingKey = opts.encodingKey || 'encoding';
    const defaultEncoding = opts.encoding || 'utf-8';
    if (!iconv.encodingExists(defaultEncoding)) {
        throw new Error(`${LOG_PREFIX} Encoding "${defaultEncoding}" is not supported.`);
    }

    return (req, res, next) => {
        const queryParts = qs.parse(url.parse(req.url).query);
        let encoding = queryParts[encodingKey] || defaultEncoding;
        if (!iconv.encodingExists(encoding)) {
            encoding = defaultEncoding;
        }

        // no cache for ping request
        res.setHeader('Cache-Control', 'private, max-age=0, no-cache');
        res.setHeader('Pragma', 'no-cache');
        const callbackName = queryParts[callbackNameKey];
        if (callbackName) {
            if (!callbackName.match(/^[a-zA-Z][a-zA-Z0-9_]*$/)) {
                const err = new Error(`${LOG_PREFIX} ${callbackNameKey} should only contains chars in 'a-zA-Z0-9_'.`);
                next(err);
                return;
            }
            // js file
            res.setHeader('Content-Type', `application/javascript; charset=${encoding}`);
        }
        else {
            // JSON data
            res.setHeader('Content-Type', `application/json; charset=${encoding}`);
        }

        let result = callback(queryParts, req, res);
        if (result && typeof result.then === 'function') {
            result.then(end, (err) => {
                next(err);
            });
        }
        else {
            end(result);
        }

        function end(result) {
            if (result == null) {
                result = '';
            }

            result = JSON.stringify(result);
            if (callbackName) {
                result = `${callbackName}(${result})`;
            }

            const resultBuffer = iconv.encode(result, encoding);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(resultBuffer)
            });
            res.end(resultBuffer);
            next();
        }
    };
};
