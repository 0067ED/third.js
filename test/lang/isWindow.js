import isWindow from 'third/lang/isWindow';

describe('third/lang/isWindow', function() {
    it('isWindow(input)', function () {
        expect(isWindow(window)).toBeTruthy();
        expect(isWindow(window.document)).toBeFalsy();
        expect(isWindow(1)).toBeFalsy();
        expect(isWindow([])).toBeFalsy();
        expect(isWindow({})).toBeFalsy();
    });
});
