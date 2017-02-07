import isObject from 'S3/lang/isObject';

describe('S3/lang/isObject', function() {
    it('isObject(input)', function () {
        expect(isObject({a: 1})).toBeTruthy();
        expect(isObject(new Object())).toBeTruthy();
        if (window.JSON) {
            expect(isObject(window.JSON)).toBeTruthy();
        }
        if (window.performance) {
            expect(isObject(window.performance)).toBeTruthy();
        }
        expect(isObject(new Array())).toBeFalsy();
        expect(isObject([])).toBeFalsy();
        expect(isObject(new String('a'))).toBeFalsy();
        expect(isObject('a')).toBeFalsy();
        expect(isObject(undefined)).toBeFalsy();
        expect(isObject(null)).toBeFalsy();
        expect(isObject(/a/g)).toBeFalsy();
    });
});
