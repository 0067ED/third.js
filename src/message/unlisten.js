import detectPostMessage from '../detect/postMessage';
import getWindow from './_getWindow';
import expando from './_expando';

var MESSAGE = 'message';
var CALLBACKS_EXPANDO = expando.CALLBACKS;
var TRUE_CALLBACKS_EXPANDO = expando.TRUE_CALLBACKS;
/**
 * remove listener
 * @param {Window} context window context.
 * @param {function(Object)=} callback listeners.
 * @return {number} callbacks count
 */
var removeListener = function (context, callback) {
    var callbacks = context[CALLBACKS_EXPANDO];
    if (!callbacks) {
        return 0;
    }

    if (!callback) {
        callbacks.length = 0;
    }
    else {
        for (var i = 0; i < callbacks.length; i++) {
            if (callbacks[i] === callback) {
                callbacks.splice(i, 1);
                break;
            }
        }
    }

    if (!callbacks.length) {
        // reset
        context[CALLBACKS_EXPANDO] = null;
    }
    return callbacks.length;
};

var unlistenByMessage = function (channel, context, callback) {
    context = getWindow(context);
    var count = removeListener(context, callback);
    if (count) {
        return;
    }

    var trueCallback = context[TRUE_CALLBACKS_EXPANDO];
    if (!trueCallback) {
        return;
    }

    if ('removeEventListener' in context) {
        context.removeEventListener(MESSAGE, trueCallback, false);
    }
    else if ('detachEvent' in context) {
        context.detachEvent('on' + MESSAGE, trueCallback);
    }
};

var unlistenByNavigator = function (channel, context, callback) {
    context = getWindow(context);
    var count = removeListener(context, callback);
    if (count) {
        return;
    }

    context.navigator[expando.TRIGGERS + channel] = null;
};

/**
 * unlisten message.
 * @param {string} channel channel name.
 * @param {Window|Element} context which window context to listen
 *                                 or which iframe element.
 *                                 Must has same origin with the current window context.
 * @param {function(Object)} callback callbacks
 *                                   callback(data);
 *                                   console.log(data.message);
 *                                   console.log(data.origin);
 */
var unlisten = detectPostMessage() ? unlistenByMessage : unlistenByNavigator;
export default unlisten;
