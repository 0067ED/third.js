import createAnonymous from 'S3/iframe/createAnonymous';
import {getWindow, createIframe, getOwnerWindow} from '../util';

describe('S3/iframe/createAnonymous', function() {
    it('createAnonymous()', function () {
        var iframe = createAnonymous();
        expect(iframe.nodeName.toLowerCase()).toBe('iframe');
    });

    it('createAnonymous(win)', function () {
        var contextIframe = createIframe();
        var contextWindow = getWindow(contextIframe);
        var iframe = createAnonymous(contextWindow);

        expect(iframe.nodeName.toLowerCase()).toBe('iframe');
        expect(getOwnerWindow(iframe)).toBe(contextWindow);
    });
});
