const url = require('url');
const qs = require('qs');
const iconv = require('iconv-lite');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

module.exports = (callback, opts) => {
    opts = opts || {};
    const callbackNameKey = opts.callbackKey || 'callback';
    const encodingKey = opts.encodingKey || 'encoding';
    const defaultEncoding = opts.encoding || 'utf-8';
    if (!iconv.encodingExists(defaultEncoding)) {
        throw new Error(`[CORS][post] Encoding "${defaultEncoding}" is not supported.`);
    }

    return (req, res, next) => {
        const queryParts = qs.parse(url.parse(req.url).query);
        let callbackName = queryParts[callbackNameKey];
        let encoding = queryParts[encodingKey] || defaultEncoding;
        if (!iconv.encodingExists(encoding)) {
            encoding = defaultEncoding;
        }
        // no cache for ping request
        res.setHeader('Cache-Control', 'private, max-age=0, no-cache');
        res.setHeader('Pragma', 'no-cache');

        if (req.method === 'GET') {
            done(queryParts);
            return;
        }

        // POST, PUT, DELETE
        urlencodedParser(req, res, () => {
            done(req.body);
        });
        next();


        function done(data) {
            let result = callback(data, req, res);
            if (result && typeof result.then === 'function') {
                result.then(end, (err) => {
                    next(err);
                });
            }
            else {
                end(result);
            }
        }

        function end(result) {
            if (result == null) {
                result = '';
            }
            result = JSON.stringify(result);

            if (!callbackName) {
                const referer = req.headers.referer ? url.parse(req.headers.referer) : null;
                const refOrigin = referer ? `${referer.protocol}//${referer.host}` : '*';
                // POST return JSON
                res.setHeader('Content-Type', `application/json; charset=${encoding}`);
                res.setHeader('Access-Control-Allow-Origin', refOrigin);
                res.setHeader('Access-Control-Allow-Credentials', 'true');
            }
            else {
                // html file
                res.setHeader('Content-Type', `text/html; charset=${encoding}`);
                callbackName = JSON.stringify(callbackName);
                result = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    </head>
                    <body>
                        <script>
                        const data = ${result};
                        const callback = ${callbackName};
                        (function () {
                            const supportPM = 'postMessage' in window;
                            const sendByPostMessage = function (data) {
                                window.parent.postMessage(data, '*');
                            };
                            const sendByNavigator = function (callback, data) {
                                const navigatorCallback = window.navigator[callback];
                                if (typeof navigatorCallback !== 'function') {
                                    return;
                                }

                                const DEFAULT_PORT_MAP = {
                                    http: 80,
                                    https: 443
                                };
                                const location = window.location;
                                const hostname = location.hostname;
                                const protocol = location.protocol;
                                const ptl = protocol.slice(0, -1);
                                const port = (location.port || DEFAULT_PORT_MAP[ptl] || 0) + '';
                                const useDefaultPort = (DEFAULT_PORT_MAP[ptl] + '') === port;
                                const host = hostname + (useDefaultPort  ? '' : (':' + port));
                                navigatorCallback({
                                    message: data + '',
                                    origin: protocol + '//' + host
                                });
                            };

                            if (supportPM) {
                                sendByPostMessage(data);
                            }
                            else {
                                sendByNavigator(callback, data);
                            }
                        })();
                        </script>
                    </body>
                    </html>`;
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
