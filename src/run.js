import isPreviewLoad from './detect/isPreviewLoad';
import isPrerender from './detect/isPrerender';
import on from './event/on';
import off from './event/off';

/**
 * run main function, until page is real rendered.
 * @param {Window=} win optional window object.
 * @param {Function} main main function.
 */
var run = function (win, main) {
    win = win || window;
    if (isPreviewLoad(win)) {
        return;
    }

    var doc = win.document;
    var executed = false;
    var wrappedMain = function () {
        main(win);
    };
    var cb = function () {
        if (!executed && !isPrerender(win)) {
            executed = true;
            wrappedMain();
            off(doc, 'visibilitychange', cb);
        }
    };

    if (isPrerender(win)) {
        on(doc, 'visibilitychange', cb);
        return;
    }
    wrappedMain();
};

export default run;
