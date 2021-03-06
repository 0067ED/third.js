import on from 'third/event/on';
import getTarget from 'third/event/getTarget';

describe('third/event/getTarget', function() {
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

    it('getTarget(event)', function () {
        runs(function () {
            on(test, 'click', function (e) {
                var target = getTarget(e);
                expect(target).toBe(test);
                expect(target.nodeName.toLowerCase()).toBe('div');
                flag = true;
            });
            test.click();
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
    });
});
