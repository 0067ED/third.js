import {createIframe, getWindow} from '../util';
import isPreviewLoad from 'S3/detect/isPreviewLoad';

describe('S3/detect/isPreviewLoad', function() {
    it('isPreviewLoad()', function () {
        var r1 = isPreviewLoad();
        var r2 = isPreviewLoad();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support isPreviewLoad:' + r1);
        }
    });
});
