import createSandbox from 'S3/sandbox/create';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/sandbox/create', function() {
    it('createSandbox(callback)', function (done) {
        var iframe = createSandbox(function (win) {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            expect(getWindow(iframe)).toBe(win);
            done();
        });
    });

    it('createSandbox(callback, win)', function (done) {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        var iframe = createSandbox(function (win) {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            expect(getWindow(iframe)).toBe(win);
            expect(getOwnerWindow(iframe)).toBe(contextWindow);
            done();
        }, contextWindow);
    });
});
