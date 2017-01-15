/**
 * 阻止事件的默认行为
 * @param {Event} event 事件对象
 */
var preventDefault = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
};

export default preventDefault;
