import on from 'S3/event/on';
import getPageY from 'S3/event/getPageY';

describe('S3/event/getPageY', function() {
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

    it('getPageY(event)', function () {
        runs(function () {
            on(test, 'click', function (e) {
                expect(typeof getPageY(e)).toBe('number');
                flag = true;
            });
            test.click();
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
});
