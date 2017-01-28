import write from './write';
import createAnonymous from './createAnonymous';
import attachIntoDOM from '../dom/attachIntoDOM';
import globalSandbox from '../sandbox/global';

 /**
  * Create a friendly(hidden) iframe with specified html content
  *
  * @param {string} html html content string
  * @param {function(Window, Document)} callback executed after scripts loaded
  * @param {Window=} win optional window
  * @return {Element} iframe DOM element
  */
var createByHTML = function (html, callback, win) {
    var iframe = createAnonymous(win);
    attachIntoDOM(iframe, win);
    write(iframe, html, function () {
        var that = this;
        globalSandbox().setTimeout(function () {
            callback.apply(that, arguments);
        }, 100);
    });
    return iframe;
};

export default createByHTML;
