var url = require('url');
var path = require('path');
var fs = require('fs');
var config = require('../config/config');

module.exports = function () {
    return function (req, res, next) {
        var pathname = url.parse(req.url).pathname.replace(config.url.cgi, '');
        var parts = pathname.split('/');
        parts.shift();
        pathname = path.join.apply(path, parts);
        var filePath = path.normalize(path.join(config.path.cgi, pathname + '.json'));

        function response(file) {
            var body = file || '';
            var isImg = (parts[0] === 'ping') && (req.method === 'GET');
            if (isImg) {
                body = fs.readFileSync(path.normalize(path.join(config.path.cgi, '/ping/img.gif')));
            }
            res.writeHead(200, {
                // 'Content-Length': Buffer.byteLength(body),
                'Content-Type': parts[0] === 'ping'
                    ? (req.method === 'GET' ? 'image/gif' : 'plain/text')
                    : 'application/javascript'
            });
            res.end(body, isImg ? 'binary' : null);
        }

        fs.readFile(filePath, function (err, file) {
            if (err) {
                var jsFilePath = path.normalize(path.join(config.path.cgi, pathname + '.js'));
                fs.readFile(jsFilePath, function (err, file) {
                    if (err) {
                        next(err);
                        return;
                    }
                    response(file);
                });
                return;
            }
            response(file);
        });
    };
};
