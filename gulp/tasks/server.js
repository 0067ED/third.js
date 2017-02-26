
const gulp = require('gulp');
const connect = require('connect');
const http = require('http');
const serveStatic = require('serve-static');
const favicon = require('../middleware/favicon');
const cgiFactory = require('../middleware/CGIFactory');
const config = require('../config/config');

const startConnect = () => {
    const app = connect();
    // 提供favicon
    app.use('/favicon.ico', favicon);
    // 模拟假数据
    app.use(config.url.cgi, cgiFactory());
    app.use(config.url.app, serveStatic(config.path.dest));

    http.createServer(app).listen(config.port.connect);
};


gulp.task('server', ['rollup', 'watch'], function (callback) {
    startConnect();
});
