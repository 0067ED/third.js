import {createIframe, getWindow} from '../util';
import sessionStorage from 'third/detect/sessionStorage';

describe('third/detect/sessionStorage', function() {
    it('sessionStorage()', function () {
        var r1 = sessionStorage();
        var r2 = sessionStorage();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support sessionStorage:' + r1);
        }
    });
});
