/**
 * Get the keyCode of event object
 * @param {Event} event event object.
 * @return {number}
 */
var getKeyCode = function (event) {
    return event.which || event.keyCode;
};

export default getKeyCode;
