import LISTENER_EXPANDO from './expando';

/**
 * 为目标元素移除事件监听器
 * @param {Element|Window|Document} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function=} opt_listener 需要移除的监听器
 * @return {Element|Window} 目标元素
 */
var off = function (element, type, opt_listener) {
    var listener = opt_listener;
    type = type.replace(/^on/i, '').toLowerCase();

    var listeners = element[LISTENER_EXPANDO];
    var isRemoveAll = !listener;
    var len = listeners.length;
    var item;
    var realType;
    var realListener;

    // 如果将listener的结构改成json
    // 可以节省掉这个循环，优化性能
    // 但是由于un的使用频率并不高，同时在listener不多的时候
    // 遍历数组的性能消耗不会对代码产生影响
    // 暂不考虑此优化
    while (len--) {
        item = listeners[len];

        // listener存在时，移除element的所有以listener监听的type类型事件
        // listener不存在时，移除element的所有type类型事件
        if (item[0] === type && (isRemoveAll || item[1] === listener)) {
            realType = item[3];
            realListener = item[2];
            if (element.removeEventListener) {
                element.removeEventListener(realType, realListener, false);
            }
            else if (element.detachEvent) {
                element.detachEvent('on' + realType, realListener);
            }
            listeners.splice(len, 1);
        }
    }

    return element;
};

export default off;
