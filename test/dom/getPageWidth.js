import {createIframe, getWindow} from '../util';
import getPageWidth from 'third/dom/getPageWidth';

describe('third/dom/getPageWidth', function() {
    it('getPageWidth()', function () {
        var r1 = getPageWidth();
        // make sure page width not change.
        var r2 = getPageWidth();
        expect(typeof r1).toBe('number');
        expect(typeof r2).toBe('number');
        expect(r1).toBe(r2);
    });
});
