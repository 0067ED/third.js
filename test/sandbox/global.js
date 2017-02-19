import global from 'S3/sandbox/global';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/sandbox/global', function() {
    it('global()', function () {
        expect(global()).toBe(window);
    });
    it('global(null, win)', function () {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        expect(global(null, contextWindow)).toBe(contextWindow);
    });

    /*
    it('global(callback)', function (done) {
        global(function (win) {
            expect(win).not.toBe(window);
            expect(win.parent).toBe(window);
            expect(global()).toBe(win);
            win.TEST = 1;
            expect(global().TEST).toBe(1);
            done();
        });
    });
    */

    it('global(callback, win)', function (done) {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        global(function (win) {
            expect(win).not.toBe(window);
            expect(win.parent).toBe(contextWindow);
            expect(global()).toBe(win);
            win.TEST = 1;
            expect(global().TEST).toBe(1);
            done();
        }, contextWindow);
    });
});
