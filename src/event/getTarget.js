/**
 * Get the target of event object
 * @param {Event} event event object.
 * @return {Element}
 */
var getTarget = function (event) {
    return event.target || event.srcElement;
};

export default getTarget;
