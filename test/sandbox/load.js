import sandboxLoad from 'S3/sandbox/load';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/sandbox/load', function() {
    it('load(src, callback)', function (done) {
        var iframe = sandboxLoad('/cgi/jsonp/load', function (win, doc) {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            expect(getWindow(iframe)).toBe(win);
            expect(win.document).toBe(doc);
            expect(win.TEST).toBe(1);
            done();
        });
    });

    it('load(srcs, callback)', function (done) {
        var iframe = sandboxLoad(
            [
                '/cgi/jsonp/load',
                '/cgi/jsonp/load2'
            ],
            function (win, doc) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                expect(getWindow(iframe)).toBe(win);
                expect(win.document).toBe(doc);
                expect(win.TEST).toBe(2);
                done();
            }
        );
    });

    it('load(src, callback, charset)', function (done) {
        var iframe = sandboxLoad(
            '/cgi/jsonp/load',
            function (win, doc) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                expect(getWindow(iframe)).toBe(win);
                expect(win.document).toBe(doc);
                done();
            },
            'GBK'
        );
    });
});
