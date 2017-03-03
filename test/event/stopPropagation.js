import on from 'S3/event/on';
import stopPropagation from 'S3/event/stopPropagation';

describe('S3/event/stopPropagation', function() {
    var test;
    var inner;
    var flag;
    beforeEach(function() {
        test = document.createElement('div');
        test.innerHTML = '<div></div>';
        document.body.appendChild(test);
        inner = test.getElementsByTagName('div')[0];
        flag = false;
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('stopPropagation(event)', function () {
        var t = 1;
        runs(function () {
            on(test, 'click', function (e) {
                t = 2;
            });
            on(inner, 'click', function (e) {
                stopPropagation(e);
            })
            inner.click();
            setTimeout(function () {
                flag = true;
            }, 9);
        });
        waitsFor(function() {
            return flag;
        }, '', 10);
        runs(function () {
            expect(t).toBe(1);
        });
    });
});
