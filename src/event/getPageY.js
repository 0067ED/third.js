import getScrollTop from '../dom/getScrollTop';

/**
 * Get pageX of event object.
 * @param {Event} event event object.
 * @param {Window} win window.
 * @return {number} pageX
 */
var getPageY = function (event, win) {
    return (event.clientY || 0) + getScrollTop(win);
};

export default getPageY;
