import on from 'third/event/on';
import getPageX from 'third/event/getPageX';

describe('third/event/getPageX', function() {
    var test;
    var flag;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
        flag = false;
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('getPageX(event)', function () {
        runs(function () {
            on(test, 'click', function (e) {
                expect(typeof getPageX(e)).toBe('number');
                flag = true;
            });
            test.click();
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
});
