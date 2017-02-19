import sandboxEval from 'S3/sandbox/eval';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/sandbox/eval', function() {
    it('eval(jsCode, callback)', function (done) {
        var iframe = sandboxEval('var TEST = 1;', function (win, doc) {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            expect(getWindow(iframe)).toBe(win);
            expect(win.document).toBe(doc);
            expect(win.TEST).toBe(1);
            done();
        });
    });

    it('eval(jsFunction, callback)', function (done) {
        var iframe = sandboxEval(
            function () {
                window.TEST = 1;
            },
            function (win, doc) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                expect(getWindow(iframe)).toBe(win);
                expect(win.document).toBe(doc);
                expect(win.TEST).toBe(1);
                done();
            }
        );
    });

    it('eval(jsFunction, callback, charset)', function (done) {
        var iframe = sandboxEval(
            'var TEST = 1;',
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
