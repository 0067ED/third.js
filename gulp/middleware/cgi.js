const url = require('url');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');

module.exports = function (req, res, next) {
    let pathname = url.parse(req.url).pathname.replace(config.url.cgi, '');
    const parts = pathname.split('/');
    parts.shift();
    pathname = path.join(...parts);
    const filePath = path.normalize(path.join(config.path.cgi, `${pathname}.json`));

    function response(file) {
        let body = file || '';
        const isImg = (parts[0] === 'ping') && (req.method === 'GET');
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
            const jsFilePath = path.normalize(path.join(config.path.cgi, `${pathname}.js`));
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
