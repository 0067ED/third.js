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
        src: './src',
        test: './test',
        dest: './dist',
        cgi: './dev/cgi'
    },
    port: {
        // connect 端口
        connect: 8888
    },
    compress: false
};
