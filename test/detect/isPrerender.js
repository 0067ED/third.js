import {createIframe, getWindow} from '../util';
import isPrerender from 'S3/detect/isPrerender';

describe('S3/detect/isPrerender', function() {
    it('isPrerender()', function () {
        var r1 = isPrerender();
        var r2 = isPrerender();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support isPrerender:' + r1);
        }
    });
});
