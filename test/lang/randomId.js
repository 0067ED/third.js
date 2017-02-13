import randomId from 'S3/lang/randomId';

describe('S3/lang/randomId', function() {
    it('randomId()', function () {
        var result = {};
        var repeat = false;
        for (var i = 0; i < 10000; i++) {
            var rid = randomId();
            if (result[rid]) {
                repeat = true;
                continue;
            }
            result[rid] = true;
        }
        expect(repeat).toBeFalsy();
        expect(typeof randomId()).toBe('string');
    });
});
