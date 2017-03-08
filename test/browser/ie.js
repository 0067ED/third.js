import {createIframe, getWindow} from '../util';
import ie from 'S3/browser/ie';

describe('S3/browser/ie', function() {
    it('ie', function () {
        expect(typeof ie).toBe('string');
        if (window.console && window.console.log) {
            window.console.log('Browser ie:' + ie);
        }
    });
});
