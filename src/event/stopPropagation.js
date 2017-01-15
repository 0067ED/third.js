/**
 * 阻止事件传播
 * @param {Event} event 事件对象
 */
var stopPropagation = function (event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
};

export default stopPropagation;
