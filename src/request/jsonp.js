import uuid from '../lang/uuid';
import toArray from '../lang/toArray';
import log from '../util/log';
import globalSandbox from '../sandbox/global';

/**
 * @param {Element} scr script节点
 * @param {string} url script节点的地址
 * @param {Document=} doc document
 * @param {string=} charset 编码
 * @param {Element=} parent script节点的父元素
 */
var createScriptTag = function (scr, url, doc, charset, parent) {
    if (charset) {
        scr.setAttribute('charset', charset);
    }
    scr.setAttribute('type', 'text/javascript');
    scr.setAttribute('src', url);

    if (parent) {
        parent.insertBefore(scr, parent.firstChild);
        return;
    }

    var scripts = doc.getElementsByTagName('script');
    var lastScript = scripts[scripts.length - 1];
    if (lastScript) {
        // insert before lastScript script element
        // http://www.paulirish.com/2011/surefire-dom-element-insertion/
        lastScript.parentNode.insertBefore(scr, lastScript);
    }
    else {
        // insert before first child in head element
        // jQuery: https://github.com/jquery/jquery/blob/1.12-stable/src/ajax/script.js#L83
        var head = doc.getElementsByTagName('head')[0];
        head.insertBefore(scr, head.firstChild);
    }
};


/**
 * 通过script标签加载数据，加载完成由服务器端触发回调
 * @param {string} url 加载数据的url.
 * @param {Function} callback 回调函数，如果超时第一个参数是Error对象
 * @param {Object=} opts options
 * @param {number=} opts.timeout 超时时间(单位：ms)，超过这个时间将不再响应本请求，并触发fail函数
 * @param {string=} opts.charset script的字符集
 * @param {Function=} opts.parent script节点的父元素
 * @param {string=} opts.query 服务器端callback请求字段名，默认为callback
 */
var jsonp = function (url, callback, opts) {
    // timeout, charset, parent, query) {
    var timeout;
    var charset;
    var parent;
    var query;
    if (opts) {
        timeout = opts.timeout;
        charset = opts.charset;
        parent = opts.parent;
        query = opts.query;
    }

    var doc = parent ? parent.ownerDocument : document;
    var win = doc.defaultView || doc.parentWindow;
    var scr = doc.createElement('script');
    var prefix = 'S3JSONPPREFIX';
    query = query || 'callback';
    timeout = timeout || 10000;

    var reg = new RegExp('(?:\\?|&)' + query + '=([^&]*)');
    var timer;
    var callbackName;
    /*
     * 返回一个函数，用于立即（挂在window上）或者超时（挂在setTimeout中）时执行
     */
    var getCallBack = function (onTimeOut) {
        return function () {
            try {
                if (onTimeOut) {
                    var e = new Error();
                    e.name = 'Timeout';
                    callback.call(win, e);
                }
                else {
                    var args = toArray(arguments);
                    args.unshift(null);
                    callback.apply(win, args);
                    globalSandbox().clearTimeout(timer);
                }
                win[callbackName] = null;
                delete win[callbackName];
            }
            catch (e) {
                log(e);
            }
            finally {
                // 只删除节点，不删除属性。会导致bug
                if (scr && scr.parentNode) {
                    scr.parentNode.removeChild(scr);
                }
            }
        };
    };

    var r = url.match(reg);
    callbackName = r ? r[1] : prefix + uuid() + (+new win.Date());
    win[callbackName] = getCallBack(false);

    if (timeout) {
        timer = globalSandbox().setTimeout(getCallBack(true), timeout);
    }

    if (!r) {
        // no callback params in url
        url += (url.indexOf('?') < 0 ? '?' : '&') + query + '=' + callbackName;
    }

    createScriptTag(scr, url, doc, charset, parent);
};

export default jsonp;
