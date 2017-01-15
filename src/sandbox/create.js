import createAnonymous from '../iframe/createAnonymous';
import ready from '../iframe/ready';
import {HTML_START, HTML_END} from '../iframe/const';
import attachIntoDOM from '../dom/attachIntoDOM';

/**
 * Create an sandbox by iframe.
 * @param {function(Window)=} callback callbacks.
 * @param {Window=} win window context.
 * @return {Element} iframe.
 */
export default function (callback, win) {
    win = win || window;
    var iframe = createAnonymous(win);
    attachIntoDOM(iframe, win);
    ready(iframe, function (w, doc, needUpdatedDomain) {
        if (w['Array'] != null) {
            callback(w);
            return;
        }

        // For IE<=8
        doc.open('text/html', 'replace')._M_ = function () {
            if (needUpdatedDomain) {
                this.domain = needUpdatedDomain;
            }
            w = this.defaultView || this.parentWindow;
            callback(w);
        };
        doc.write(HTML_START + '<body onload="document._M_();"></body>' + HTML_END);
        doc.close();
    });

    return iframe;
};
