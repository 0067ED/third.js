/**
 * Detect cors support.
 * @return {string} 'xhr' | 'xdr' | ''
 */
var cors = function () {
    // Weried bug in IE 7 8, use try catch as fallback
    try {
        // for modern browser
        if ('XMLHttpRequest' in window && 'withCredentials' in new window.XMLHttpRequest()) {
            return 'xhr';
        }

        // for IE9 & IE8
        if ('XDomainRequest' in window) {
            return 'xdr';
        }
    }
    catch (e) {}

    // for old browser
    return '';
};

export default cors;
