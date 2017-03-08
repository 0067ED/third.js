import {createIframe, getWindow} from '../util';
import localStorage from 'S3/detect/localStorage';

describe('S3/detect/localStorage', function() {
    it('localStorage()', function () {
        var r1 = localStorage();
        var r2 = localStorage();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support localStorage:' + r1);
        }
    });
});
