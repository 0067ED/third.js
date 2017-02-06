import capitalize from 'S3/lang/capitalize';

describe('S3/lang/capitalize', function() {
    it('capitalize(input)', function () {
        expect(capitalize('aPPLE.Inc')).toBe('Apple.inc');
        expect(capitalize('.aPPLE.Inc')).toBe('.apple.inc');
        expect(capitalize('0DAY')).toBe('0day');
    });
});
