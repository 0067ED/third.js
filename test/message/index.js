import send from 'S3/message/send';
import listen from 'S3/message/listen';
import unlisten from 'S3/message/unlisten';
import parseUrl from 'S3/url/parse';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/message', function() {
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
        runs(function () {
            var url = parseUrl('.');
            var html = '<iframe src="sendMessageToParent.html?name=test_child_2"></iframe>';
            var targetUrl = parseUrl('sendMessageToParent.html');
            listen('test_parent', window, function (data) {
                if (data.message === 'init') {
                    var targetContext = getWindow(test.getElementsByTagName('iframe')[0]);
                    send('test_child_2', targetContext, 'message from parent');
                    return;
                }
                expect(data.origin).toBe(targetUrl.origin);
                expect(data.message).toBe(url.origin + '|message from parent');
                flag = true;
            });
            test.innerHTML = html;
        });
        waitsFor(function() {
            return flag;
        }, '', 2000);
    });
});
