import {createIframe, getWindow} from '../util';
import isChrome from 'S3/browser/isChrome';

describe('S3/browser/isChrome', function() {
    it('isChrome', function () {
        expect(typeof isChrome).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Browser isChrome:' + isChrome);
        }
    });
});
