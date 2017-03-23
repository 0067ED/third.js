import detectPostMessage from '../detect/postMessage';
import isWindow from '../lang/isWindow';
import uuid from '../lang/uuid';
import getByWindow from './_getByWindow';

var MESSAGE = 'message';
var EXPANDO = 'S3MESSAGE_LISTENERS' + uuid();
/**
 * add listener
 * @param {string} channel channel name.
 * @param {Window} context window context.
 * @param {function(Object)} callback listeners.
 */
var addListener = function (channel, context, callback) {
    var inited = !!context[EXPANDO];
    var listeners = context[EXPANDO] = context[EXPANDO] || [];
    listeners.push([channel, callback]);
    return inited
};
/**
 * call listeners
 * @param {string} channel channel name.
 * @param {Window} context window context.
 * @param {Object} data data.
 * @param {string} data.origin origin.
 * @param {string} data.message message.
 */
var callListeners = function (channel, context, data) {
    var listeners = context[EXPANDO];
    if (!listeners || !listeners.length) {
        return;
    }

    for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        if (listener[0] === channel) {
            listener[1](data);
        }
    }
};

var listenByMessage = function (channel, callback, context) {
    context = getByWindow(context);
    var inited = addListener(channel, context, callback);
    if (inited) {
        return;
    }

    var trueCallback = function (event) {
        // For Chrome, the origin property is in the event.originalEvent object.
        var origin = event.origin || event.originalEvent.origin;
        var message = event.data;
        callListeners(channel, context, {
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

var listenByNavigator = function (channel, callback, context) {
    context = getByWindow(context);
    var inited = addListener(channel, context, callback);
    if (inited) {
        return;
    }

    context.navigator[EXPANDO_NAVIGATOR_KEY + channel] = function (data) {
        callListeners(channel, context, data);
    };
};

/**
 * listen message.
 * @param {string} channel channel name.
 * @param {function(Object)} callback callbacks
 *                                   callback(data);
 *                                   console.log(data.message);
 *                                   console.log(data.origin);
 * @param {Window|Element} context which window context to listen
 *                                 or which iframe element.
 *                                 Must has same origin with the current window context.
 */
var listen = detectPostMessage() ? listenByMessage : listenByNavigator;
export default listen;
