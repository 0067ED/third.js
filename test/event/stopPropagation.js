import on from 'S3/event/on';
import stopPropagation from 'S3/event/stopPropagation';

describe('S3/event/stopPropagation', function() {
    var test;
    var inner;
    beforeEach(function() {
        test = document.createElement('div');
        test.innerHTML = '<div></div>';
        document.body.appendChild(test);
        inner = test.getElementsByTagName('div')[0];
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('stopPropagation(event)', function (done) {
        var t = 1;
        on(test, 'click', function (e) {
            t = 2;
        });
        on(inner, 'click', function (e) {
            stopPropagation(e);
        })
        inner.click();
        setTimeout(function () {
            expect(t).toBe(1);
            done();
        }, 100);
    });
});
