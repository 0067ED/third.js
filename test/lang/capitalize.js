import capitalize from 'third/lang/capitalize';

describe('third/lang/capitalize', function() {
    it('capitalize(input)', function () {
        expect(capitalize('aPPLE.Inc')).toBe('Apple.inc');
        expect(capitalize('.aPPLE.Inc')).toBe('.apple.inc');
        expect(capitalize('0DAY')).toBe('0day');
    });
});
