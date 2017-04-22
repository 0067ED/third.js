import {createIframe, getWindow} from '../util';
import isChrome from 'third/browser/isChrome';

describe('third/browser/isChrome', function() {
    it('isChrome', function () {
        expect(typeof isChrome).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Browser isChrome:' + isChrome);
        }
    });
});
