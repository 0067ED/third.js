import createBySrc from 'S3/iframe/createBySrc';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/iframe/write', function() {
    it('createBySrc(src)', function () {
        var iframe = createBySrc('/cgi/html/test');
        expect(iframe.nodeName.toLowerCase()).toBe('iframe');
        // use `window.window` instead of `window` to fixed fro IE8
        expect(getOwnerWindow(iframe)).toBe(window.window);
        expect(iframe.src).toContain('/cgi/html/test');
    });

    it('createBySrc(src, win)', function () {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        var iframe = createBySrc('/cgi/html/test', contextWindow);
        expect(iframe.nodeName.toLowerCase()).toBe('iframe');
        expect(getOwnerWindow(iframe)).toBe(contextWindow);
        expect(iframe.src).toContain('/cgi/html/test');
    });
});
