import on from 'S3/event/on';
import getPageY from 'S3/event/getPageY';

describe('S3/event/getPageY', function() {
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('getPageY(event)', function (done) {
        on(test, 'click', function (e) {
            expect(typeof getPageY(e)).toBe('number');
            done();
        });
        test.click();
    });
});
