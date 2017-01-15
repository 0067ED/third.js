var ios = '';
var ua = navigator.userAgent;
if (/iP(hone|od|ad)/.test(ua)) {
    var r = ua.match(/OS (\d+_\d+_?(?:\d+)?)/);
    ios = r[1] ? r[1].replace(/_/g, '.') : '';
}

export default ios;
