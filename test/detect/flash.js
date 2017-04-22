import {createIframe, getWindow} from '../util';
import flash from 'third/detect/flash';

describe('third/detect/flash', function() {
    it('flash()', function () {
        var r1 = flash();
        var r2 = flash();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('string');
        if (window.console && window.console.log) {
            window.console.log('Support flash:' + r1);
        }
    });
});
