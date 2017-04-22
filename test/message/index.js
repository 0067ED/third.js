import send from 'third/message/send';
import listen from 'third/message/listen';
import unlisten from 'third/message/unlisten';
import parseUrl from 'third/url/parse';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('third/message', function() {
    var flag;
    var test;
    beforeEach(function() {
        flag = false;
        test = document.createElement('div');
        document.body.appendChild(test);
    });
    afterEach(function() {
        document.body.removeChild(test);
    });

    it('listen && unlisten', function () {
        runs(function () {
            var url = parseUrl('.');
            var targetUrlRow = url.protocol + '//localhost:' + url.port + '/' + 'sendMessageToParent.html';
            var targetUrl = parseUrl(targetUrlRow);
            listen('test_parent', window, function firstListenParent(data) {
                unlisten('test_parent', window, firstListenParent);
                expect(data.origin).toBe(targetUrl.origin);
                expect(data.message).toBe('init');
                flag = true;
            });
            var html = '<iframe src="' + targetUrlRow + '?name=test_child_1"></iframe>';
            test.innerHTML = html;
        });
        waitsFor(function() {
            return flag;
        }, '', 2000);
    });

    it('send', function () {
        var url = parseUrl('.');
        var html = '<iframe src="sendMessageToParent.html?name=test_child_2"></iframe>';
        var targetUrl = parseUrl('sendMessageToParent.html');
        var callback = function (data) {
            if (data.message === 'init') {
                var targetContext = getWindow(test.getElementsByTagName('iframe')[0]);
                send('test_child_2', targetContext, 'message from parent');
                return;
            }
            expect(data.origin).toBe(targetUrl.origin);
            expect(data.message).toBe(url.origin + '|message from parent');
            flag = true;
            unlisten('test_parent', window, callback);
        };
        runs(function () {
            listen('test_parent', window, callback);
            test.innerHTML = html;
        });
        waitsFor(function() {
            return flag;
        }, '', 2000);
    });
});
