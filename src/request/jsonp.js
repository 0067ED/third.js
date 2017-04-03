import uuid from '../lang/uuid';
import toArray from '../lang/toArray';
import log from '../util/log';
import globalSandbox from '../sandbox/global';

/**
 * @param {Element} scr script node.
 * @param {string} url script src url.
 * @param {Document=} doc document.
 * @param {string=} charset charset.
 * @param {Element=} parent parent node of script node.
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
 * JSONP as you known
 * @param {string} url url
 * @param {Function} callback callback of JSONP request.
 *                              callback(err, data);
 * @param {Object=} opts options.
 * @param {number=} opts.timeout timeout in ms.
 * @param {string=} opts.charset charset.
 * @param {Function=} opts.parent parent node of script node.
 * @param {string=} opts.query query key of callback name.
 */
var jsonp = function (url, callback, opts) {
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
     * Return an function, and bind it on window.
     *
     * @param {boolean} onTimeout is this returned function as timeout callback
     * @return {Function} callback
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
    callbackName = r ? r[1] : prefix + uuid('_') + (+new win.Date());
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
