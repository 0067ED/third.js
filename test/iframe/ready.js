import createAnonymous from 'S3/iframe/createAnonymous';
import ready from 'S3/iframe/ready';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/iframe/ready', function() {
    it('ready(iframe, callback)', function () {
        var iframe = createAnonymous();
        ready(iframe, function (win, doc, needUpdatedDomain) {
            expect(win).toBe(getWindow(win));
            expect(doc).toBe(win.document);
            expect(typeof needUpdatedDomain).toBe('string');
        });
    });
});
