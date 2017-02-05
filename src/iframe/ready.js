import on from '../event/on';
import off from '../event/off';
import globalSandbox from '../sandbox/global';

/**
 * 当匿名iframe准备完全后，执行回调函数。
 * 回调函数的参数为iframe的window、document，和表明是否需要修改document.domain的布尔值
 * 解决了IE下页面修改过document.domain后无法访问匿名iframe的问题
 * @param {Element} iframe iframe dom element
 * @param {function (Window, Document, string)} callback .
 */
var ready = function (iframe, callback) {
    var win;
    var doc;
    var gDoc = iframe.ownerDocument;
    var updateDomain = false;

    try {
        win = iframe.contentWindow;
        doc = win.document;
    }
    catch (e) {
        updateDomain = true;
        on(iframe, 'load', function () {
            win = iframe.contentWindow;
            doc = win.document;
            off(iframe, 'load');
            callback(win, doc, gDoc.domain);
        });
        // 如果当前页面修改过document.domain
        // 那么会报“拒绝访问”的错误
        // 只有IE会进入到此处
        iframe.src = 'javascript:void((function () {'
            + 'document.open("text/html", "replace");'
            + 'document.domain = "' + gDoc.domain + '";'
            + 'document.close();'
            + '})())';
    }

    if (!updateDomain) {
        globalSandbox().setTimeout(function () {
            callback(win, doc, '');
        }, 100);
    }
};


export default ready;
