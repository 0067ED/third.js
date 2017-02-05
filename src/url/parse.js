var startWith = function (str, part) {
    return str.indexOf(part) === 0;
};

/**
 * parse url.
 * @param {string} url url string to be parsed.
 * @param {string=} relativedUrl relatived url, must be absolute url.
 * @return {Object} parsed url.
 *           {
 *              protocol: '',
 *              host: '',
 *              port: '',
 *              path: '',
 *              query: '',
 *              url: ''
 *           }
 */
var parseUrl = function (url, relativedUrl) {
    function parseLink(link) {
        var hostname = (link.hostname || '').split(':')[0].toLowerCase();
        var protocol = (link.protocol || '').toLowerCase();
        var port = link.port * 1 || (protocol === 'http:' ? 80 : (protocol === 'https:' ? 443 : ''));
        var pathname = link.pathname || '';
        if (!startWith(pathname, '/')) {
            pathname = '/' + pathname;
        }
        return [hostname, '' + port, pathname];
    }

    var doc = document;
    var link = doc.createElement('a');

    // parse relatived url
    link.href = relativedUrl || doc.location.href;
    var relativedProtocol = (link.protocol || '').toLowerCase();
    var relatived = parseLink(link);

    // if url is relative, then convert it into absolute url.
    if (startWith(url, '//')) {
        // url === '//qidian.qq.com/da/i.js?pid=1123123'
        url = relativedProtocol + url;
    }
    else {
        var relativedBaseUrl = relativedProtocol + '//' + relatived[0] + (relatived[1] ? ':' + relatived[1] : '');
        if (startWith(url, '/')) {
            // url === '/da/i.js'
            url = relativedBaseUrl + url;
        }
        else {
            if (!url || startWith(url, '?')) {
                // url === ''
                // url === '?pid=1123123'
                url = relativedBaseUrl + relatived[2] + (url || link.search || '');
            }
            else if (url.split('/')[0].indexOf(':') < 0) {
                // url is relative path
                // url === 'da/i.js'
                url = relativedBaseUrl + relatived[2].substring(0, relatived[2].lastIndexOf('/')) + '/' + url;
            }
        }
    }

    link.href = url;
    var r = parseLink(link);
    var protocol = (link.protocol || '').toLowerCase();
    var query = link.search || '';
    return {
        protocol: protocol,
        host: r[0],
        port: r[1],
        path: r[2],
        query: query,
        url: protocol + '//' + r[0] + ':' + r[1] + r[2] + query
    };
};

export default parseUrl;
