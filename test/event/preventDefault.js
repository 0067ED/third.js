import on from 'S3/event/on';
import preventDefault from 'S3/event/preventDefault';

describe('S3/event/preventDefault', function() {
    var test;
    var inner;
    beforeEach(function() {
        test = document.createElement('div');
        test.innerHTML = '<div></div>';
        document.body.appendChild(test);
        inner = test.getElementsByTagName('testInner')[0];
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('preventDefault(event)', function (done) {
        var t = 1;
        on(test, 'click', function (e) {
            preventDefault(e);
            t = 2;
        });
        test.click();
        setTimeout(function () {
            expect(t).toBe(2);
            done();
        }, 0);
    });
});
