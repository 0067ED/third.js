import {createIframe, getWindow} from '../util';
import cors from 'S3/detect/cors';

describe('S3/detect/cors', function() {
    it('cors()', function () {
        var r1 = cors();
        var r2 = cors();
        expect(r1).toBe(r2);
        expect(r1.match(/xhr|xdr|/)).not.toBeNull();
        if (window.console && window.console.log) {
            window.console.log('Support cors:' + r1);
        }
    });
});
