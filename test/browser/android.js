import {createIframe, getWindow} from '../util';
import android from 'third/browser/android';

describe('third/browser/android', function() {
    it('android', function () {
        expect(typeof android).toBe('string');
        if (window.console && window.console.log) {
            window.console.log('Browser android:' + android);
        }
    });
});
