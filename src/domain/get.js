var URL_REG = /[^:]+:\/\/([^:\/]+)/;
/**
 * 获取 url 中的 domain.
 * @param {string} url 地址
 * @return {string} domain
 */
var getDomain = function (url) {
    var r = url.match(URL_REG);
    return r ? r[1] : '';
};

export default getDomain;
