import {createIframe, getWindow} from '../util';
import adBlock from 'third/detect/adBlock';

describe('third/detect/adBlock', function() {
    it('adBlock()', function () {
        var r1 = adBlock();
        var r2 = adBlock();
        expect(r1).toBe(r2);
        expect(typeof r1).toBe('boolean');
        if (window.console && window.console.log) {
            window.console.log('Support adBlock:' + r1);
        }
    });
});
