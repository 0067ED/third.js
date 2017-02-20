import on from 'S3/event/on';
import getTarget from 'S3/event/getTarget';

describe('S3/event/getTarget', function() {
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('getTarget(event)', function (done) {
        var t = 1;
        on(test, 'click', function (e) {
            var target = getTarget(e);
            expect(target).toBe(test);
            expect(target.nodeName.toLowerCase()).toBe('div');
            t = 2;
            done();
        });
        test.click();
    });
});
