import on from 'third/event/on';
import preventDefault from 'third/event/preventDefault';

describe('third/event/preventDefault', function() {
    var test;
    var inner;
    var flag;
    beforeEach(function() {
        test = document.createElement('div');
        test.innerHTML = '<div></div>';
        document.body.appendChild(test);
        inner = test.getElementsByTagName('testInner')[0];
        flag = false;
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('preventDefault(event)', function () {
        var t = 1;
        runs(function () {
            on(test, 'click', function (e) {
                preventDefault(e);
                t = 2;
                flag = true;
            });
            test.click();
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
        runs(function () {
            expect(t).toBe(2);
        });
    });
});
