/**
 * @file configs
 */
var path = require('path');
var version = require('../../package.json').version;

module.exports = {
    version: version,
    url: {
        app: '/',
        cgi: '/cgi'
    },
    path: {
        src: './src',
        html: './html',
        dest: './dist',
        entrys: './test',
        jasmine: './html/jasmine-1.3.1',
        cgi: path.resolve(__dirname, '../../dev/cgi'),
        alias: {
            S3: path.resolve(__dirname, '../../src')
        }
    },
    port: {
        // connect 端口
        connect: 8888
    },
    compress: false
};
