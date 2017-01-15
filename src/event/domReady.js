import LISTENER_EXPANDO from './expando';
import globalSandbox from '../sandbox/global';

var binded = false;
var domReady = function (listener, win) {
    win = win || window;
    var doc = win.document;
    var realEventType = 'DOMContentLoaded';
    // 42 === Truth of universe
    // Make sure it's not used by `off` api.
    var eventType = realEventType + 42;
    var listeners = doc[LISTENER_EXPANDO] = doc[LISTENER_EXPANDO] || [];
    listeners[listeners.length] = [eventType, listener, listener, realEventType];

    if (binded) {
        return;
    }
    binded = true;

    var isReady = false;
    function ready() {
        var listeners = doc[LISTENER_EXPANDO];
        var i = 0;
        var item;
        while (item = listeners[i]) {
            if (item[0] === eventType) {
                var listener = item[1];
                listener(win);
                listeners.splice(i, 1);
            }
            else {
                i++;
            }
        }
        isReady = true;
    }

    // The following code modified from jQuery
    // https://github.com/jquery/jquery/blob/1.12-stable/src/core/ready.js
    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if (doc.addEventListener) {
            doc.removeEventListener('DOMContentLoaded', completed);
            win.removeEventListener('load', completed);
        }
        else {
            doc.detachEvent('onreadystatechange', completed);
            win.detachEvent('onload', completed);
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
        // readyState === 'complete' is good enough for us to call the dom ready in oldIE
        if (doc.addEventListener || win.event.type === 'load' || doc.readyState === 'complete') {
            detach();
            ready();
        }
    }

    // Catch cases where $(document).ready() is called
    // after the browser event has already occurred.
    // Support: IE6-10
    // Older IE sometimes signals 'interactive' too soon
    if (doc.readyState === 'complete' || (doc.readyState !== 'loading' && !doc.documentElement.doScroll)) {
        // Handle it asynchronously to allow scripts the opportunity to delay ready
        globalSandbox().setTimeout(ready);
    }
    // Standards-based browsers support DOMContentLoaded
    else if (doc.addEventListener) {
        // Use the handy event callback
        doc.addEventListener('DOMContentLoaded', completed);
        // A fallback to window.onload, that will always work
        win.addEventListener('load', completed);
    }
    // If IE event model is used
    else {
        // Ensure firing before onload, maybe late but safe also for iframes
        doc.attachEvent('onreadystatechange', completed);

        // A fallback to window.onload, that will always work
        win.attachEvent('onload', completed);

        // If IE and not a frame
        // continually check to see if the document is ready
        var top = false;
        try {
            top = win.frameElement == null && doc.documentElement;
        }
        catch (e) {}

        if (top && top.doScroll) {
            function doScrollCheck() { // eslint-disable-line
                if (!isReady) {
                    try {
                        // Use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        top.doScroll('left');
                    }
                    catch (e) {
                        return globalSandbox().setTimeout(doScrollCheck, 50);
                    }

                    // detach all dom ready events
                    detach();

                    // and execute any waiting functions
                    ready();
                }
            }
            doScrollCheck();
        }
    }
};

export default domReady;
