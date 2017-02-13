import type from 'S3/lang/type';

describe('S3/lang/type', function() {
    it('type(input)', function () {
        expect(type(true)).toBe('boolean');
        expect(type(1)).toBe('number');
        expect(type('test')).toBe('string');
        expect(type(function () {})).toBe('function');
        expect(type(window.encodeURIComponent)).toBe('function');
        expect(type([])).toBe('array');
        expect(type(new Array())).toBe('array');
        expect(type(new Date())).toBe('date');
        expect(type(/test/)).toBe('regexp');
        expect(type(new RegExp('test', 'g'))).toBe('regexp');
        expect(type({})).toBe('object');
        expect(type(new Object())).toBe('object');
        expect(type(window)).toBe('object');
        expect(type(new Error('error'))).toBe('error');
        expect(type(null)).toBe('null');
        expect(type(undefined)).toBe('undefined');
    });
});
