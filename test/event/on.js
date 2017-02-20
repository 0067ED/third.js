import on from 'S3/event/on';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/event/on', function() {
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('on(element, event, callback)', function (done) {
        var t = 1;
        on(test, 'click', function (e) {
            expect(e).not.toBeNull();
            t = 2;
        });
        test.click();
        setTimeout(function () {
            expect(t).toBe(2);
            done();
        }, 100);
    });
});
