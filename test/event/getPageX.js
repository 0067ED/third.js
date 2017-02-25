import on from 'S3/event/on';
import getPageX from 'S3/event/getPageX';

describe('S3/event/getPageX', function() {
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('getPageX(event)', function (done) {
        on(test, 'click', function (e) {
            expect(getPageX(e)).toBe(0);
            done();
        });
        test.click();
    });
});
