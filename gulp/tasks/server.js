
const gulp = require('gulp');
const connect = require('connect');
const http = require('http');
const serveStatic = require('serve-static');
const favicon = require('../middleware/favicon');
const cgi = require('../middleware/cgi');
const config = require('../config/config');

const startConnect = () => {
    const app = connect();
    // 提供favicon
    app.use('/favicon.ico', favicon);
    // 模拟假数据
    app.use(config.url.cgi, cgi);
    app.use(config.url.app, serveStatic(config.path.dest));

    http.createServer(app).listen(config.port.connect);
};


gulp.task('server', ['rollup', 'watch'], function (callback) {
    startConnect();
});
