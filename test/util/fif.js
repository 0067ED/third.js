import fif from 'S3/util/fif';

describe('S3/util/fif', function() {
    it('fif', function(done) {
        var iframe = fif('/cgi/jsonp/fif_test', function () {
            expect(iframe.nodeName.toLowerCase()).toEqual('iframe');
            expect(iframe.contentWindow.fif_loaded).toBe(true);
            expect(iframe.contentWindow.inDapIF).toBe(true);
            var scripts = iframe.contentWindow.document.getElementsByTagName('script');
            expect(scripts.length).toBe(2);
            expect(scripts[1].src).toMatch('/cgi/jsonp/fif_test');
            done();
        });
    });
});
