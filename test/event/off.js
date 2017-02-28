import on from 'S3/event/on';
import off from 'S3/event/off';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/event/off', function() {
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

    it('off(element, event)', function () {
        var t = 1;
        runs(function () {
            on(test, 'click', function (e) {
                t = 2;
                flag = true;
            });
            on(test, 'click', function (e) {
                t = 3;
                flag = true;
            });
            off(test, 'click');
            test.click();
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

    it('off(element, event, callback)', function () {
        var t = 1;
        runs(function () {
            on(test, 'click', function (e) {
                t = 2;
                flag = true;
            });
            var setThree = function (e) {
                t = 3;
                flag = true;
            };
            on(test, 'click', setThree);
            off(test, 'click', setThree);
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
