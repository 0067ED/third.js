import isString from 'S3/lang/isString';

describe('S3/lang/isString', function() {
    it('isString(input)', function () {
        expect(isString('input')).toBeTruthy();
        expect(isString(new String())).toBeFalsy();
        expect(isString(1)).toBeFalsy();
        expect(isString([])).toBeFalsy();
        expect(isString({})).toBeFalsy();
    });
});
