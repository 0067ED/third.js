import detectPostMessage from '../detect/postMessage';
import isWindow from '../lang/isWindow';
import getByWindow from './_getByWindow';

var sendByPostMessage = function (target, message) {
    if (!target) {
        return;
    }
    target = getByWindow(target);
    target.postMessage(message + '', '*');
};

var sendByNavigator = function (target, message) {
    if (!target) {
        return;
    }
    target = getByWindow(target);

};

/**
 * send message by navigator.
 * @param {Window|Element} target target window or target element.
 * @param {string} message message.
 */
var send = detectPostMessage() ? sendByPostMessage : sendByNavigator;
export default send;
