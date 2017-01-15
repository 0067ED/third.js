/**
 * detect if this script is run in a frame.
 * @param {Window=} win window object.
 * @return {boolean} run in a frame or not.
 */
var inFrame = function (win) {
    win = win || window;
    var api = 'location';
    return win[api] !== win.top[api];
};

export default inFrame;
