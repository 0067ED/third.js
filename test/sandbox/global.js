import global from 'S3/sandbox/global';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/sandbox/global', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('global()', function () {
        expect(global()).toBe(window);
    });
    it('global(null, win)', function () {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        expect(global(null, contextWindow)).toBe(contextWindow);
    });

    /*
    // global(callback) can only ran by once.
    it('global(callback)', function () {
        var t = 1;
        runs(function () {
            global(function (win) {
                expect(win).not.toBe(window);
                expect(win.parent).toBe(window.window);
                expect(global()).toBe(win);
                win.TEST = 1;
                expect(global().TEST).toBe(1);
                flag = true;
            });
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
    */

    it('global(callback, win)', function () {
        var t = 1;
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        runs(function () {
            global(function (win) {
                expect(win).not.toBe(window);
                expect(win.parent).not.toBe(window);
                expect(win.parent).toBe(contextWindow);
                expect(global()).toBe(win);
                win.TEST = 1;
                expect(global().TEST).toBe(1);
                flag = true;
            }, contextWindow);
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
});
