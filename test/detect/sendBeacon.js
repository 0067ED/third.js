import {createIframe, getWindow} from '../util';
import sendBeacon from 'S3/detect/sendBeacon';

describe('S3/detect/sendBeacon', function() {
    it('sendBeacon()', function () {
        var r1 = sendBeacon();
        var r2 = sendBeacon();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support sendBeacon:' + r1);
        }
    });
});
