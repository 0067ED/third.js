import ready from 'S3/iframe/ready';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/iframe/ready', function() {
    var flag;
    beforeEach(function() {
        flag = false;
    });

    it('ready(iframe, callback)', function () {
        var t = 1;
        runs(function () {
            var iframe = createIframe();
            ready(iframe, function (win, doc, needUpdatedDomain) {
                expect(win).toBe(getWindow(iframe));
                expect(doc).toBe(win.document);
                expect(typeof needUpdatedDomain).toBe('string');
                flag = true;
            });
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
});
