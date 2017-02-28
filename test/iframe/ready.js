import ready from 'S3/iframe/ready';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/iframe/ready', function() {
    it('ready(iframe, callback)', function (done) {
        var iframe = createIframe();
        ready(iframe, function (win, doc, needUpdatedDomain) {
            expect(win).toBe(getWindow(iframe));
            expect(doc).toBe(win.document);
            expect(typeof needUpdatedDomain).toBe('string');
            done();
        });
    });
});
