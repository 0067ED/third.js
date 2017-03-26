import detectPostMessage from '../detect/postMessage';
import getWindow from './_getWindow';
import expando from './_expando';

var sendByPostMessage = function (channel, target, message) {
    if (!target) {
        return;
    }
    target = getWindow(target);
    target.postMessage(message + '', '*');
};

var sendByNavigator = function (channel, target, message) {
    if (!channel) {
        return;
    }

    var navigatorCallback = window.navigator[expando.TRIGGERS + channel];
    if (typeof navigatorCallback !== 'function') {
        return;
    }

    var DEFAULT_PORT_MAP = {
        http: 80,
        https: 443
    };
    var location = window.location;
    var hostname = location.hostname;
    var protocol = location.protocol;
    var ptl = protocol.slice(0, -1);
    var port = (location.port || DEFAULT_PORT_MAP[ptl] || 0) + '';
    // only show port when it's not default port.
    var useDefaultPort = (DEFAULT_PORT_MAP[ptl] + '') === port;
    var host = hostname + (useDefaultPort  ? '' : (':' + port));
    navigatorCallback({
        message: message + '',
        origin: protocol + '//' + host
    });
};

/**
 * send message by navigator.
 * @param {string} channel channel name.
 * @param {Window|Element} target target window or target element.
 * @param {string} message message.
 */
var send = detectPostMessage() ? sendByPostMessage : sendByNavigator;
export default send;
