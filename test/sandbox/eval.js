import sandboxEval from 'third/sandbox/eval';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('third/sandbox/eval', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('eval(jsCode, callback)', function () {
        var t = 1;
        runs(function () {
            var iframe = sandboxEval('var TEST = 1;', function (win, doc) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                expect(getWindow(iframe)).toBe(win);
                expect(win.document).toBe(doc);
                expect(win.TEST).toBe(1);
                flag = true;
            });
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });

    it('eval(jsFunction, callback)', function () {
        var t = 1;
        runs(function () {
            var iframe = sandboxEval(
                function () {
                    window.TEST = 1;
                },
                function (win, doc) {
                    expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                    expect(getWindow(iframe)).toBe(win);
                    expect(win.document).toBe(doc);
                    expect(win.TEST).toBe(1);
                    flag = true;
                }
            );
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });

    it('eval(jsFunction, callback, charset)', function () {
        var t = 1;
        runs(function () {
            var iframe = sandboxEval(
                'var TEST = 1;',
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
        }, '', 10);
    });
});
