import createSandbox from 'third/sandbox/create';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('third/sandbox/create', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('createSandbox(callback)', function () {
        var t = 1;
        runs(function () {
            var iframe = createSandbox(function (win) {
                expect(iframe.nodeName.toLowerCase()).toBe('iframe');
                expect(getWindow(iframe)).toBe(win);
                flag = true;
            });
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });

    it('createSandbox(callback, win)', function () {
        var t = 1;
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        var iframe;
        var win;
        runs(function () {
            iframe = createSandbox(function (w) {
                win = w;
                flag = true;
            }, contextWindow);
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
        runs(function () {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            expect(getWindow(iframe)).toBe(win);
            expect(getOwnerWindow(iframe)).toBe(contextWindow);
            expect(win.parent).toBe(contextWindow);
        });
    });
});
