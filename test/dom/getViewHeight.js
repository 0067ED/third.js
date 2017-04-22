import {createIframe, getWindow} from '../util';
import getViewWidth from 'third/dom/getViewWidth';

describe('third/dom/getViewWidth', function() {
    it('getViewWidth()', function () {
        var r1 = getViewWidth();
        // make sure page not resize.
        var r2 = getViewWidth();
        expect(typeof r1).toBe('number');
        expect(typeof r2).toBe('number');
        expect(r1).toBe(r2);
    });
});
