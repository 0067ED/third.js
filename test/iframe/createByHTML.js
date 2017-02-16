import createByHTML from 'S3/iframe/createByHTML';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/iframe/createByHTML', function() {
    var html = '<div id="test">test</div>';
    it('createByHTML(html, callback)', function (done) {
        var iframe = createByHTML(html, function (win, doc) {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            expect(getOwnerWindow(iframe)).toBe(window);
            expect(win.document).toBe(doc);
            expect(win).toBe(getWindow(iframe));
            expect(doc.getElementById('test')).not.toBeNull();
            expect(doc.getElementById('test').innerHTML).toBe('test');
            done();
        });
    });

    it('createByHTML(html, callback, win)', function (done) {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        var iframe = createByHTML(html, function (win, doc) {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            expect(getOwnerWindow(iframe)).toBe(contextWindow);
            expect(win.document).toBe(doc);
            expect(win).toBe(getWindow(iframe));
            expect(doc.getElementById('test')).not.toBeNull();
            expect(doc.getElementById('test').innerHTML).toBe('test');
            done();
        }, contextWindow);
    });
});
