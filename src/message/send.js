import detectPostMessage from '../detect/postMessage';
import isWindow from '../lang/isWindow';
import uuid from '../lang/uuid';
import getByWindow from './_getByWindow';
import EXPANDO_NAVIGATOR_KEY from './_expando';

var sendByPostMessage = function (target, message) {
    if (!target) {
        return;
    }
    target = getByWindow(target);
    target.postMessage(message + '', '*');
};

var sendByNavigator = function (channel, message) {
    if (!channel) {
        return;
    }

    var navigatorCallback = window.navigator[EXPANDO_NAVIGATOR_KEY + channel];
    if (!navigatorCallback) {
        return;
    }
    navigatorCallback(message + '');
};

/**
 * send message by navigator.
 * @param {Window|Element} target target window or target element.
 * @param {string} message message.
 */
var send = detectPostMessage() ? sendByPostMessage : sendByNavigator;
export default send;
