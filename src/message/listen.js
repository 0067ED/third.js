import detectPostMessage from '../detect/postMessage';
import getWindow from './_getWindow';
import expando from './_expando';

var MESSAGE = 'message';
var CALLBACKS_EXPANDO = expando.CALLBACKS;
var TRUE_CALLBACKS_EXPANDO = expando.TRUE_CALLBACKS;
/**
 * add listener
 * @param {Window} context window context.
 * @param {function(Object)} callback listeners.
 */
var addListener = function (context, callback) {
    var inited = !!context[CALLBACKS_EXPANDO];
    var listeners = context[CALLBACKS_EXPANDO] = context[CALLBACKS_EXPANDO] || [];
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
    var listeners = context[CALLBACKS_EXPANDO];
    if (!listeners || !listeners.length) {
        return;
    }

    for (var i = 0; i < listeners.length; i++) {
        if (listeners[i]) {
            listeners[i](data);
        }
    }
};

var listenByMessage = function (channel, context, callback) {
    context = getWindow(context);
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
    context[TRUE_CALLBACKS_EXPANDO] = trueCallback;
    if ('addEventListener' in context) {
        context.addEventListener(MESSAGE, trueCallback, false);
    }
    else if ('attachEvent' in context) {
        context.attachEvent('on' + MESSAGE, trueCallback);
    }
};

var listenByNavigator = function (channel, context, callback) {
    context = getWindow(context);
    var inited = addListener(context, callback);
    if (inited) {
        return;
    }

    context.navigator[expando.TRIGGERS + channel] = function (data) {
        callListeners(context, data);
    };
};

/**
 * listen message.
 * @param {string} channel channel name.
 * @param {Window|Element} context which window context to listen
 *                                 or which iframe element.
 *                                 Must has same origin with the current window context.
 * @param {function(Object)} callback callbacks
 *                                   callback(data);
 *                                   console.log(data.message);
 *                                   console.log(data.origin);
 */
var listen = detectPostMessage() ? listenByMessage : listenByNavigator;
export default listen;
