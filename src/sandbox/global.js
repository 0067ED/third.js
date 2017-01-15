import createSandbox from './create';
// import isNative from '../lang/isNative';

var globalSandbox;

/**
 * Check context's method is rewrited or not.
 * If rewrited then create an global sandbox by iframe.
 * Or get the created global sandbox.
 *
 *      globalSandbox(function () {
 *          var sb = globalSandbox();
 *          // EXAMPLE
 *      }, window);
 *
 * @param {function(window)=} callback callback.
 * @param {Window=} win window context;
 * @return {Window} Window context.
 */
export default function (callback, win) {
    win = win || window;
    if (globalSandbox || !callback) {
        var gsb = globalSandbox || win;
        if (callback) {
            callback(gsb);
        }
        return gsb;
    }

    // Check function is native or not
    /*
    var CHECKED_FUNCTION = [
        'encodeURIComponent',
        'encodeURI',
        'decodeURIComponent',
        'decodeURI',
        'setTimeout',
        'clearTimeout',
        'setInterval',
        'clearInterval'
    ];
    var isAllNative = true;
    for (var i = 0, l = CHECKED_FUNCTION.length; i < l; i++) {
        if (!isNative(win[CHECKED_FUNCTION[i]])) {
            isAllNative = false;
            break;
        }
    }
    if (isAllNative) {
        globalSandbox = win;
        callback(globalSandbox);
        return;
    }
    */

    createSandbox(function (sandbox) {
        globalSandbox = sandbox;
        callback(sandbox);
    }, win);
}
