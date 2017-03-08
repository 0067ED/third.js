import {createIframe, getWindow} from '../util';
import android from 'S3/browser/android';

describe('S3/browser/android', function() {
    it('android', function () {
        expect(typeof android).toBe('string');
        if (window.console && window.console.log) {
            window.console.log('Browser android:' + android);
        }
    });
});
