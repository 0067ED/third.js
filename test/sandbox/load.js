import sandboxLoad from 'S3/sandbox/load';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/sandbox/load', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('load(src, callback)', function () {
        var t = 1;
        runs(function () {
            var iframe = sandboxLoad('/cgi/jsonp/load', function (win, doc) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                expect(getWindow(iframe)).toBe(win);
                expect(win.document).toBe(doc);
                expect(win.TEST).toBe(1);
                flag = true;
            });
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('load(srcs, callback)', function () {
        var t = 1;
        runs(function () {
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
                    flag = true;
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });

    it('load(src, callback, charset)', function () {
        var t = 1;
        runs(function () {
            var iframe = sandboxLoad(
                '/cgi/jsonp/load',
                function (win, doc) {
                    expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                    expect(getWindow(iframe)).toBe(win);
                    expect(win.document).toBe(doc);
                    flag = true;
                },
                'GBK'
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 200);
    });
});
