import {createIframe, getWindow} from '../util';
import attachIntoDOM from 'third/dom/attachIntoDOM';

describe('third/dom/attachIntoDOM', function() {
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        test.innerHTML = 'test';
    });

    afterEach(function() {
        if (test.parentNode) {
            test.parentNode.removeChild(test);
        }
    });

    it('attachIntoDOM(dom)', function () {
        attachIntoDOM(test);
        expect(test.parentNode).not.toBeNull();
        expect(test.parentNode.nodeName.toLowerCase()).toBe('body');
        expect(test.parentNode).toBe(document.body);
    });

    it('attachIntoDOM(dom, win)', function () {
        var iframe = createIframe();
        var contextWindow = getWindow(iframe);
        attachIntoDOM(test, contextWindow);
        expect(test.parentNode).not.toBeNull();
        expect(test.parentNode.nodeName.toLowerCase()).toBe('body');
        expect(test.parentNode).toBe(contextWindow.document.body);
    });
});
