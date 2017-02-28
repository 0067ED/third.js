import fif from 'S3/util/fif';
import {getWindow, createIframe} from '../util';

describe('S3/util/fif', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('fif(url, callback)', function () {
        var iframe;
        runs(function () {
            iframe = fif('/cgi/jsonp/fif_test', function () {
                flag = true;
            });
        });
        waitsFor(function() {
            return flag;
        }, '', 100);
        runs(function () {
            var win = iframe.contentWindow;
            var scripts = win.document.getElementsByTagName('script');
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(win.fif_loaded).toBe(true);
            expect(win.inDapIF).toBe(true);
            expect(scripts[1].src).toMatch('/cgi/jsonp/fif_test');
        });
    });

    it('fif(urls, callback)', function () {
        var iframe;
        runs(function () {
            iframe = fif(
                [
                    '/cgi/jsonp/fif_test',
                    '/cgi/jsonp/fif_test0',
                    '/cgi/jsonp/fif_test1'
                ],
                function () {
                    flag = true;
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 100);
        runs(function () {
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(iframe.contentWindow.fif_loaded).toBe(true);
            expect(iframe.contentWindow.inDapIF).toBe(true);
            expect(iframe.contentWindow.fif_count).toBe(2);
            var scripts = iframe.contentWindow.document.getElementsByTagName('script');
            expect(scripts[3].src).toMatch('/cgi/jsonp/fif_test1');
            expect(scripts[2].src).toMatch('/cgi/jsonp/fif_test0');
            expect(scripts[1].src).toMatch('/cgi/jsonp/fif_test');
        });
    });

    it('fif(url, callback, {fifMark})', function () {
        var iframe;
        runs(function () {
            iframe = fif(
                '/cgi/jsonp/fif_test',
                function () {
                    flag = true;
                },
                {
                    fifMark: 'TEST_MARK'
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 100);
        runs(function () {
            var win = iframe.contentWindow;
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(win.inDapIF).toBeUndefined();
            expect(win.TEST_MARK).toBe(true);
        });
    });

    it('fif(url, callback, {context})', function (done) {
        var contextIframe = createIframe()
        getWindow(contextIframe).isContext = true;
        var iframe;
        runs(function () {
            iframe = fif(
                '/cgi/jsonp/fif_test',
                function () {
                    flag = true;
                },
                {
                    context: contextIframe.contentWindow
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 100);
        runs(function () {
            var win = iframe.contentWindow;
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(win.inDapIF).toBe(true);
            expect(win.fif_loaded).toBe(true);
            var contextWindow = iframe.ownerDocument.defaultView || iframe.ownerDocument.parentWindow;
            expect(contextWindow.isContext).toBe(true);
        });
    });
});
