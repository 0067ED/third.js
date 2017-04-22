import {createIframe, getWindow} from '../util';
import getText from 'third/dom/getText';

describe('third/dom/getText', function() {
    var test;
    beforeEach(function() {
        test = document.createElement('div');
        document.body.appendChild(test);
    });

    afterEach(function() {
        if (test.parentNode) {
            test.parentNode.removeChild(test);
        }
    });

    it('getText(dom)', function () {
        test.innerHTML = 'Something is very <b>important</b>!';
        expect(getText(test)).toBe('Something is very important!');
    });

    it('getText(dom)', function () {
        test.innerHTML = 'Something is very <textarea>important</textarea>!';
        expect(getText(test)).toBe('Something is very important!');
    });
});
