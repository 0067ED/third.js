import {createIframe, getWindow} from '../util';
import touchEvents from 'third/detect/touchEvents';

describe('third/detect/touchEvents', function() {
    it('touchEvents()', function () {
        var r1 = touchEvents();
        var r2 = touchEvents();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support touchEvents:' + r1);
        }
    });
});
