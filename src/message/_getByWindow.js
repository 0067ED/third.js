/**
 * get by window.
 * @param {Window|Element} context window context or iframe element.
 */
var getByWindow = function (context) {
    return !context ? window : (isWindow(context) ? context : context.contentWindow);
};

export default getByWindow;
