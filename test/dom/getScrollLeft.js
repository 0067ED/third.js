import {createIframe, getWindow} from '../util';
import getScrollLeft from 'S3/dom/getScrollLeft';

describe('S3/dom/getScrollLeft', function() {
    it('getScrollLeft()', function () {
        window.scrollTo(0, 0);
        var r1 = getScrollLeft();
        expect(r1).toBe(0);
        // window.scrollTo(100, 0);
        // var r2 = getScrollLeft();
        // expect(r2).toBe(1);
    });
});
