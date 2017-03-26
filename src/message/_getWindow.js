/**
 * get by window.
 * @param {(Window|Element)=} context window context or iframe element or null.
 * @return {Window} window.
 */
var getByWindow = function (context) {
    try {
        return !context
            ? window :
            (
                (typeof context.nodeName === 'string' && context.nodeName.toLowerCase() === 'iframe')
                ? context.contentWindow
                : context
            );
    }
    catch(e) {
        // context is cross origin window.
        return context;
    }
};

export default getByWindow;
