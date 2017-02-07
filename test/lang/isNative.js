import isNative from 'S3/lang/isNative';

describe('S3/lang/isNative', function() {
    it('isNative(input)', function () {
        expect(isNative(window.setTimeout)).toBeTruthy();
        expect(isNative(window.encodeURIComponent)).toBeTruthy();
        if (window.TypedArray) {
            expect(isNative(window.TypedArray)).toBeTruthy();
        }
        if (window.Int32Array) {
            expect(isNative(window.Int32Array)).toBeTruthy();
        }
        if (window.Performance) {
            expect(isNative(window.Performance)).toBeTruthy();
        }
        expect(isNative(JSON)).toBeFalsy();
        expect(isNative(JSON.stringify)).toBe(!!JSON.stringify);
        expect(isNative(function () {})).toBeFalsy();
        expect(isNative(/a/g)).toBeFalsy();
    });
});
