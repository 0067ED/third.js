const url = require('url');
const qs = require('qs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

module.exports = (callback, opts) => {
    return (req, res, next) => {
        // no cache for ping request
        res.setHeader('Cache-Control', 'private, max-age=0, no-cache');
        res.setHeader('Pragma', 'no-cache');

        if (req.method === 'POST') {
            const referer = req.headers.referer ? url.parse(req.headers.referer) : null;
            const refOrigin = referer ? `${referer.protocol}//${referer.host}` : '*';
            // POST return empty string text.
            urlencodedParser(req, res, () => {
                callback(req.body, req, res);
                res.writeHead(200, {
                    'Content-Length': 0,
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': refOrigin,
                    'Access-Control-Allow-Credentials': 'true'
                });
                res.end('');
                next();
            });
            return;
        }

        console.log(req.url);
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
