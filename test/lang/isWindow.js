import isWindow from 'S3/lang/isWindow';

describe('S3/lang/isWindow', function() {
    it('isWindow(input)', function () {
        expect(isWindow(window)).toBeTruthy();
        expect(isWindow(window.document)).toBeFalsy();
        expect(isWindow(1)).toBeFalsy();
        expect(isWindow([])).toBeFalsy();
        expect(isWindow({})).toBeFalsy();
    });
});
