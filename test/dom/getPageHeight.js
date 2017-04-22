import {createIframe, getWindow} from '../util';
import getPageHeight from 'third/dom/getPageHeight';

describe('third/dom/getPageHeight', function() {
    it('getPageHeight()', function () {
        var r1 = getPageHeight();
        // make sure page height not change.
        var r2 = getPageHeight();
        expect(typeof r1).toBe('number');
        expect(typeof r2).toBe('number');
        expect(r1).toBe(r2);
    });
});
