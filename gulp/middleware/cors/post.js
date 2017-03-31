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

        var result = callback(req, res);
        if (result == null) {
            result += '';
        }
        else if (typeof result !== 'string') {
            // stringify object, array and other thing
            result = JSON.stringify(result);
        }

        var callbackName = urlParts.query[callbackNameKey];
        if (!callbackName) {
            // POST return JSON
            res.setHeader('Content-Type', `application/json; charset=${encoding}`);
        }
        else {
            // html file
            res.setHeader('Content-Type', `text/html; charset=${encoding}`);
            // escape single quote
            result = result.replace(/'/g, '\\\'');
            callbackName = callbackName.replace(/'/g, '\\\'');
            result = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                </head>
                <body>
                    <script>
                    var data = '${result}';
                    var callback = '${callbackName}';
                    (function () {
                        var supportPM = 'postMessage' in window;
                        var sendByPostMessage = function (data) {
                            window.parent.postMessage(data, '*');
                        };
                        var sendByNavigator = function (callback, data) {
                            var navigatorCallback = window.navigator[callback];
                            if (typeof navigatorCallback !== 'function') {
                                return;
                            }

                            var DEFAULT_PORT_MAP = {
                                http: 80,
                                https: 443
                            };
                            var location = window.location;
                            var hostname = location.hostname;
                            var protocol = location.protocol;
                            var ptl = protocol.slice(0, -1);
                            var port = (location.port || DEFAULT_PORT_MAP[ptl] || 0) + '';
                            var useDefaultPort = (DEFAULT_PORT_MAP[ptl] + '') === port;
                            var host = hostname + (useDefaultPort  ? '' : (':' + port));
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

        var resultBuffer = iconv.encode(result, encoding);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(resultBuffer)
        });
        res.end(resultBuffer);
        next();
    };
};
