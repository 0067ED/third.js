import {createIframe, getWindow} from '../util';
import ie from 'third/browser/ie';

describe('third/browser/ie', function() {
    it('ie', function () {
        expect(typeof ie).toBe('string');
        if (window.console && window.console.log) {
            window.console.log('Browser ie:' + ie);
        }
    });
});
