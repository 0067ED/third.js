import {createIframe, getWindow} from '../util';
import getScrollTop from 'third/dom/getScrollTop';

describe('third/dom/getScrollTop', function() {
    it('getScrollTop()', function () {
        window.scrollTo(0, 0);
        var r1 = getScrollTop();
        expect(r1).toBe(0);
        // window.scrollTo(0, 10);
        // var r2 = getScrollTop();
        // expect(r2).toBe(10);
    });
});
