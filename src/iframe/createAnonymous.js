/**
 * Create an anonymous iframe
 * @param {Window=} win optional window
 * @return {Element} iframe DOM element
 */
var createAnonymous = function (win) {
    var doc = (win || window).document;
    var iframe = doc.createElement('iframe');

    iframe.src = 'javascript:false';
    // hide iframe frome screen reader
    iframe.title = '';
    iframe.role = 'presentation';

    iframe.frameBorder = '0';
    iframe.tabIndex = '-1';
    (iframe.frameElement || iframe).style.cssText = 'position:absolute;width:0;height:0;border:0;';
    return iframe;
};

export default createAnonymous;
