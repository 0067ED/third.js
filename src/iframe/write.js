import ready from './ready';
import CONST from './const';
import ie from '../browser/ie';

/**
 * 把html写入匿名iframe中
 *
 * @param {Element} iframe .
 * @param {string} html .
 * @param {function (Window, Document)=} onload .
 */
var write = function (iframe, html, onload) {
    ready(iframe, function (win, doc, needUpdatedDomain) {
        var loaded = false;
        doc.open('text/html', 'replace')._M_ = function () {
            if (loaded) {
                return;
            }
            loaded = true;

            if (needUpdatedDomain) {
                this.domain = needUpdatedDomain;
            }

            if (onload) {
                var win = this.defaultView || this.parentWindow;
                onload(win, this);
            }
        };

        var useSuffix = ie && ie < 10;
        doc.write(CONST.HTML_START
            + '<body onload="document._M_();">'
            + html
            + (useSuffix ? CONST.IE_HTML_SUFFIX : '')
            + '</body>'
            + CONST.HTML_END);

        if (!useSuffix) {
            doc.close();
        }
    });
};


export default write;
