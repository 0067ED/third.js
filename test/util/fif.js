import fif from 'S3/util/fif';

describe('S3/util/fif', function() {
    it('fif(url, callback)', function (done) {
        var iframe = fif('/cgi/jsonp/fif_test', function () {
            var win = iframe.contentWindow;
            var scripts = win.document.getElementsByTagName('script');
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(win.fif_loaded).toBe(true);
            expect(win.inDapIF).toBe(true);
            expect(scripts[scripts.length - 1].src).toMatch('/cgi/jsonp/fif_test');
            done();
        });
    });

    it('fif(urls, callback)', function (done) {
        var iframe = fif(
            [
                '/cgi/jsonp/fif_test',
                '/cgi/jsonp/fif_test0',
                '/cgi/jsonp/fif_test1'
            ],
            function () {
                expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
                expect(iframe.contentWindow.fif_loaded).toBe(true);
                expect(iframe.contentWindow.inDapIF).toBe(true);
                expect(iframe.contentWindow.fif_count).toBe(2);
                var scripts = iframe.contentWindow.document.getElementsByTagName('script');
                expect(scripts[scripts.length - 1].src).toMatch('/cgi/jsonp/fif_test1');
                expect(scripts[scripts.length - 2].src).toMatch('/cgi/jsonp/fif_test0');
                expect(scripts[scripts.length - 3].src).toMatch('/cgi/jsonp/fif_test');
                done();
            }
        );
    });

    it('fif(url, callback, {fifMark})', function (done) {
        var iframe = fif('/cgi/jsonp/fif_test', function () {
            var win = iframe.contentWindow;
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(win.inDapIF).toBeUndefined();
            expect(win.TEST_MARK).toBe(true);
            done();
        }, {
            fifMark: 'TEST_MARK'
        });
    });

    it('fif(url, callback, {context})', function (done) {
        var contextIframe = document.createElement('iframe');
        document.body.appendChild(contextIframe);
        contextIframe.contentWindow.isContext = true;

        var iframe = fif('/cgi/jsonp/fif_test', function () {
            var win = iframe.contentWindow;
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(win.inDapIF).toBe(true);
            expect(win.fif_loaded).toBe(true);
            var contextWindow = iframe.ownerDocument.defaultView || iframe.ownerDocument.parentWindow;
            expect(contextWindow.isContext).toBe(true);
            done();
        }, {
            context: contextIframe.contentWindow
        });
    });
});
