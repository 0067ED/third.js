import isNative from 'third/lang/isNative';

describe('third/lang/isNative', function() {
    it('isNative(input)', function () {
        // Can't support IE < 9
        // expect(isNative(window.setTimeout)).toBeTruthy();
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
