var startWith = function (str, part) {
    return str.indexOf(part) === 0;
};

var DEFAULT_PORT_MAP = {
    ftp: 21,
    file: 0,
    gopher: 70,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
};

/**
 * parse url.
 * @param {string} url url string to be parsed.
 * @param {string=} relativedUrl relatived url, must be absolute url.
 * @return {Object} parsed url.
 *           'http://example.com:8000/books/12?type=music#hash'
 *           {
 *              protocol: 'http:',
 *              origin: 'http://example.com:8000'
 *              host: 'example.com:8000',
 *              hostname: 'example.com',
 *              port: '8000',
 *              pathname: '/books/12',
 *              search: '?type=music',
 *              href: 'http://example.com:8000/books/12?type=music#hash'，
 *              hash: '#hash'
 *           }
 */
var parseUrl = function (url, relativedUrl) {
    function parseLink(link) {
        var hostname = (link.hostname || '').toLowerCase();
        var protocol = (link.protocol || '').toLowerCase();
        var ptl = protocol.slice(0, -1);
        var port = (link.port || DEFAULT_PORT_MAP[ptl] || 0) + '';
        var pathname = link.pathname || '';
        if (!startWith(pathname, '/')) {
            pathname = '/' + pathname;
        }
        // only show port when it's not default port.
        var useDefaultPort = (DEFAULT_PORT_MAP[ptl] + '') === port;
        var host = hostname + (useDefaultPort  ? '' : (':' + port));

        return {
            host: host,
            hostname: hostname,
            port: port,
            pathname: pathname,
            search: link.search || '',
            protocol: protocol,
            hash: link.hash || '',
            href: link.href || '',
            origin: protocol + '//' + host
        };
    }

    var doc = document;
    var link = doc.createElement('a');

    // parse relatived url
    link.href = relativedUrl || doc.location.href;
    var relatived = parseLink(link);

    // if url is relative, then convert it into absolute url.
    if (!url) {
        // url === ''
        url = relatived.href;
    }
    else if (startWith(url, '//')) {
        // url === '//qidian.qq.com/da/i.js?pid=1123123'
        url = relatived.protocol + url;
    }
    else if (startWith(url, '?')) {
        // url === '?pid=1123123'
        url = relatived.origin + relatived.pathname + url;
    }
    else if (startWith(url, '#')) {
        // url === '#hash'
        url = relatived.origin + relatived.pathname + relatived.search + url;
    }
    else if (startWith(url, '/')) {
        // url === '/da/i.js'
        url = relatived.origin + url;
    }
    else if (url.split('/')[0].indexOf(':') < 0) {
        // url is relative path
        // url === 'da/i.js'
        // url === './da/i.js'
        // url === '../da/i.js'
        url = relatived.origin + relatived.pathname.substring(0, relatived.pathname.lastIndexOf('/')) + '/' + url;
    }

    link.href = url;
    return parseLink(link);
};

export default parseUrl;
