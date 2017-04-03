
const gulp = require('gulp');
const connect = require('connect');
const http = require('http');
const serveStatic = require('serve-static');
const favicon = require('../middleware/favicon');
const cgiFactory = require('../middleware/CGIFactory');
const config = require('../config/config');
const third = require('../middleware/cors');

const startConnect = () => {
    const app = connect();
    // 提供favicon
    app.use('/favicon.ico', favicon);
    // 模拟假数据
    app.use(config.url.cgi, cgiFactory());
    app.use(config.url.app, serveStatic(config.path.dest));
    app.use('/ping', third('ping', (data, req, res) => {
        console.log(`[PING]${req.url}`);
        console.log('|   ' + JSON.stringify(data));
    }));
    app.use('/jsonp', third('jsonp', (data, req, res) => {
        console.log(`[JSONP]${req.url}`);
        console.log('|   ' + JSON.stringify(data));
        data.from = 'server';
        return data;
    }));
    app.use('/jsonpWithCB', third('jsonp', (data, req, res) => {
        console.log(`[JSONP-CB]${req.url}`);
        console.log('|   ' + JSON.stringify(data));
        data.from = 'server';
        return data;
    }, {
        callbackKey: 'cb',
        encoding: 'gbk'
    }));
    app.use('/post', third('post', (data, req, res) => {
        console.log(`[POST]${req.url}`);
        console.log('|   ' + JSON.stringify(data));
        data.from = 'server';
        return data;
    }));

    http.createServer(app).listen(config.port.connect);
};


gulp.task('server', ['build', 'watch'], function (callback) {
    startConnect();
});
