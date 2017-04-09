const url = require('url');
const qs = require('qs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const textParser = bodyParser.text();

module.exports = (callback, opts) => {
    return (req, res, next) => {
        // no cache for ping request
        res.setHeader('Cache-Control', 'private, max-age=0, no-cache');
        res.setHeader('Pragma', 'no-cache');

        if (req.method === 'POST') {
            const contentType = req.headers['content-type'].split(';')[0].toLowerCase();
            const referer = req.headers.referer ? url.parse(req.headers.referer) : null;
            const refOrigin = referer ? `${referer.protocol}//${referer.host}` : '*';
            // POST return empty string text.
            const returnEmptyString = (data) => {
                callback(data, req, res);
                res.writeHead(200, {
                    'Content-Length': 0,
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': refOrigin,
                    'Access-Control-Allow-Credentials': 'true'
                });
                res.end('');
                next();
            };
            if (contentType === 'text/plain') {
                // for navigator.sendBeacon
                textParser(req, res, () => {
                    returnEmptyString(qs.parse(req.body));
                });
            }
            else {
                // for CORS XHR
                urlencodedParser(req, res, () => {
                    returnEmptyString(req.body);
                });
            }
            return;
        }

        const queryParts = qs.parse(url.parse(req.url).query);
        callback(queryParts, req, res);
        // GET serve 1x1 pixel
        const img = new Buffer([
            71,  73,  70,  56,  57,  97,  1,   0,   1,   0,
            128, 0,   0,   0,   0,   0,   0,   0,   0,   33,
            249, 4,   1,   0,   0,   0,   0,   44,  0,   0,
            0,   0,   1,   0,   1,   0,   0,   2,   2,   68,
            1,   0,   59
        ]);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(img),
            'Content-Type': 'image/gif'
        });
        res.end(img, 'binary');
        next();
    };
};
