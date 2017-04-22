import isArray from 'third/lang/isArray';

describe('third/lang/isArray', function() {
    it('isArray(input)', function () {
        expect(isArray([1, 2])).toBeTruthy();
        expect(isArray(new Array())).toBeTruthy();
        expect(isArray('test')).toBeFalsy();
        expect(isArray(1)).toBeFalsy();
    });
});
