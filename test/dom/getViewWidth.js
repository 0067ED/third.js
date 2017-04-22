import {createIframe, getWindow} from '../util';
import getViewHeight from 'third/dom/getViewHeight';

describe('third/dom/getViewHeight', function() {
    it('getViewHeight()', function () {
        var r1 = getViewHeight();
        // make sure page not resize.
        var r2 = getViewHeight();
        expect(typeof r1).toBe('number');
        expect(typeof r2).toBe('number');
        expect(r1).toBe(r2);
    });
});
