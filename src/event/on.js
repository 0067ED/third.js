import LISTENER_EXPANDO from './expando';

/**
 * 为目标元素添加事件监听器
 * @param {Element|Window|Document} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} listener 需要添加的监听器
 *  1. 不支持跨浏览器的鼠标滚轮事件监听器添加<br>
 *  2. 改方法不为监听器灌入事件对象，以防止跨iframe事件挂载的事件对象获取失败
 * @return {Element|Window} 目标元素
 */
var on = function (element, type, listener) {
    type = type.replace(/^on/i, '');
    var realListener = function (ev) {
        // 1. 这里不支持EventArgument,  原因是跨frame的事件挂载
        // 2. element是为了修正this
        listener.call(element, ev);
    };
    var realType = type;
    type = type.toLowerCase();

    // 事件监听器挂载
    if (element.addEventListener) {
        element.addEventListener(realType, realListener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent('on' + realType, realListener);
    }

    // 将监听器存储到数组中
    var listeners = element[LISTENER_EXPANDO] = element[LISTENER_EXPANDO] = [];
    listeners[listeners.length] = [type, listener, realListener, realType];
    return element;
};

export default on;
