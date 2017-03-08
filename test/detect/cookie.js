import {createIframe, getWindow} from '../util';
import cookie from 'S3/detect/cookie';

describe('S3/detect/cookie', function() {
    it('cookie()', function () {
        var r1 = cookie();
        var r2 = cookie();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support cookie:' + r1);
        }
    });
});
