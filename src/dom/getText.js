/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * Modified from https://github.com/jquery/jquery/blob/1.12-stable/external/sizzle/dist/sizzle.js#L963
 *
 * @param {Element} elem dom element.
 * @return {string} text
 */
var getText = function (elem) {
    var ret = '';
    var nodeType = elem.nodeType;

    if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === 'string') {
            return elem.textContent;
        }

        // Traverse its children
        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
        }
    }
    else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
    }
    // Do not include comment or processing instruction nodes

    return ret;
};

export default getText;
