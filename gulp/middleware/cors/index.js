const jsonp = require('./jsonp');
const ping = require('./ping');
const post = require('./post');

const METHOD_MAP = {
    jsonp,
    ping,
    post
};

module.exports = function (method, callback, opts) {
    var createMethod = METHOD_MAP[method];
    return createMethod(callback, opts);
};
