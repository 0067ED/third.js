module.exports = function ping(callback, opts) {
    return function (req, res, next) {
        // no cache for ping request
        res.setHeader('Cache-Control', 'private, max-age=0, no-cache');
        res.setHeader('Pragma', 'no-cache');

        callback(req, res);
        if (req.method === 'POST') {
            // POST return empty string text.
            res.writeHead(200, {
                'Content-Length': 0,
                'Content-Type': 'plain/text'
            });
            res.end('');
            next();
            return;
        }

        // GET serve 1x1 pixel
        var img = new Buffer([
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
