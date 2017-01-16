/**
 * @file configs
 */
const version = require('../../package.json').version;

module.exports = {
    version: version,
    url: {
        app: '/S3',
        cgi: '/cgi'
    },
    path: {
        src: './',
        test: './test',
        dest: './dist',
        entrys: {
            test: './test/test.js'
        },
        cgi: './dev/cgi',
        alias: {
            S3: './src'
        }
    },
    port: {
        // connect 端口
        connect: 8888
    },
    compress: false
};
