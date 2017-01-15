import attachIntoDOM from '../dom/attachIntoDOM';

/**
  * Create an friendly(hidden) iframe with specified src.
  *
  * @param {string} src src url.
  * @param {Window=} win optional window
  * @return {Element} iframe DOM element
  */
var createBySrc = function (src, win) {
    var doc = (win || window).document;
    var iframe = doc.createElement('iframe');

    iframe.src = src;
    // hide iframe frome screen reader
    iframe.title = '';
    iframe.role = 'presentation';

    iframe.frameBorder = '0';
    iframe.tabIndex = '-1';
    (iframe.frameElement || iframe).style.cssText = 'position:absolute;width:0;height:0;border:0;';

    attachIntoDOM(iframe, win);
    return iframe;
};

export default createBySrc;
