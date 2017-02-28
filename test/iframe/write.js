import createAnonymous from 'S3/iframe/createAnonymous';
import write from 'S3/iframe/write';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/iframe/write', function() {
    var html = '<div id="test">test</div>';

    it('write(iframe, html, callback)', function (done) {
        var iframe = createIframe();
        write(iframe, html, function (win, doc) {
            expect(iframe.nodeName.toLowerCase()).toBe('iframe');
            // use `window.window` instead of `window` to fixed fro IE8
            expect(getOwnerWindow(iframe)).toBe(window.window);
            expect(win.document).toBe(doc);
            expect(win).toBe(getWindow(iframe));
            expect(doc.getElementById('test')).not.toBeNull();
            expect(doc.getElementById('test').innerHTML).toBe('test');
            done();
        });
    });
});
