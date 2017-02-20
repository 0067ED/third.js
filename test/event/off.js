import on from 'S3/event/on';
import off from 'S3/event/off';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/event/off', function() {
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
    });

    afterEach(function() {
        document.body.removeChild(test);
    });

    it('off(element, event)', function (done) {
        var t = 1;
        on(test, 'click', function (e) {
            t = 2;
        });
        on(test, 'click', function (e) {
            t = 3;
        });
        off(test, 'click');
        test.click();
        setTimeout(function () {
            expect(t).toBe(1);
            done();
        }, 100);
    });

    it('off(element, event, callback)', function (done) {
        var t = 1;
        on(test, 'click', function (e) {
            t = 2;
        });
        var setThree = function (e) {
            t = 3;
        };
        on(test, 'click', setThree);
        off(test, 'click', setThree);
        test.click();
        setTimeout(function () {
            expect(t).toBe(2);
            done();
        }, 100);
    });
});
