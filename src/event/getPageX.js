import getScrollLeft from '../dom/getScrollLeft';

/**
 * Get pageY of event object.
 * @param {Event} event event object.
 * @param {Window} win window.
 * @return {number} pageY
 */
var getPageX = function (event, win) {
    return (event.clientX || 0) + getScrollLeft(win);
};

export default getPageX;
