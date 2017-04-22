import {createIframe, getWindow} from '../util';
import inFrame from 'third/detect/inFrame';

describe('third/detect/inFrame', function() {
    it('inFrame()', function () {
        var r1 = inFrame();
        var r2 = inFrame();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support inFrame:' + r1);
        }
    });
});
