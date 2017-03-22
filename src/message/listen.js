import detectPostMessage from '../detect/postMessage';
import isWindow from '../lang/isWindow';
import uuid from '../lang/uuid';
import getByWindow from './_getByWindow';

var MESSAGE = 'message';
var EXPANDO = 'S3MESSAGE_LISTENERS' + uuid();
/**
 * add listener
 * @param {Window} context window context.
 * @param {function(Object)} callback listeners.
 */
var addListener = function (context, callback) {
    var inited = !!context[EXPANDO];
    var listeners = context[EXPANDO] = context[EXPANDO] || [];
    listeners.push(callback);
    return inited
};
/**
 * call listeners
 * @param {Window} context window context.
 * @param {Object} data data.
 * @param {string} data.origin origin.
 * @param {string} data.message message.
 */
var callListeners = function (context, data) {
    var listeners = context[EXPANDO];
    if (!listeners || !listeners.length) {
        return;
    }

    for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener(data);
    }
};

var listenByMessage = function (callback, context) {
    context = getByWindow(context);
    var inited = addListener(context, callback);
    if (inited) {
        return;
    }

    var trueCallback = function (event) {
        // For Chrome, the origin property is in the event.originalEvent object.
        var origin = event.origin || event.originalEvent.origin;
        var message = event.data;
        callListeners(context, {
            origin: event.origin,
            message: message
        });
    };
    if ('addEventListener' in context) {
        context.addEventListener(MESSAGE, trueCallback, false);
    }
    else if ('attachEvent' in context) {
        context.attachEvent('on' + MESSAGE, trueCallback);
    }
};

var listenByNavigator = function (callback, context) {
    context = getByWindow(context);

};

/**
 * listen message.
 * @param {function(Object)} callback callbacks
 *                                   callback(data);
 *                                   console.log(data.message);
 *                                   console.log(data.origin);
 * @param {Window|Element} context which window context to listen
 *                                 or which iframe element.
 */
var listen = detectPostMessage() ? listenByMessage : listenByNavigator;
export default listen;
