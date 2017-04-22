import send from 'third/message/send';
import listen from 'third/message/listen';
import parse from 'third/url/parse';
import getQuery from 'third/url/getQuery';

export var createIframe = function (id) {
    id = id || 'GLOBAL_TEST_IFRAME';
    var iframe = document.getElementById(id);
    if (iframe) {
        return iframe;
    }

    var contextIframe = document.createElement('iframe');
    contextIframe.id = id;
    document.body.appendChild(contextIframe);
    return contextIframe;
};

export var createSecondIframe = function () {
    return createIframe('GLOBAL_TEST_IFRAME_2');
};

export var getWindow = function (iframe) {
    return iframe.contentWindow;
};

export var getOwnerWindow = function (iframe) {
    return iframe.ownerDocument.defaultView || iframe.ownerDocument.parentWindow;
};

export var sendMessage = send;
window.sendMessage = send;
export var listenMessage = listen;
window.listenMessage = listen;
window.parseUrl = parse;
window.getUrlQuery = getQuery;
