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

export var getWindow = function (iframe) {
    return iframe.contentWindow;
};

export var getOwnerWindow = function (iframe) {
    return iframe.ownerDocument.defaultView || iframe.ownerDocument.parentWindow;
};
