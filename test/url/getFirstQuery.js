import getFirstQuery from 'S3/url/getFirstQuery';

describe('S3/url/getFirstQuery', function() {
    it('getFirstQuery(url, key)', function () {
        expect(getFirstQuery('http://192.168.1.2:8000?a=1', 'a')).toBe('1');
        expect(getFirstQuery('http://test.com?a=1', 'a')).toBe('1');
        expect(getFirstQuery('http://test.com?b=2&a=1&b=1', 'a')).toBe('1');
        expect(getFirstQuery('http://test.com?a=1#a=2', 'a')).toBe('1');
        expect(getFirstQuery('http://test.com?a=1#?a=2', 'a')).toBe('1');
        expect(getFirstQuery('http://test.com?a=2&a=1#?a=2', 'a')).toBe('2');
        expect(getFirstQuery('http://test.com?b=1#?a=2', 'a')).toBe('');
        expect(getFirstQuery('http://test.com', 'a')).toBe('');
        expect(getFirstQuery('?a=1', 'a')).toBe('1');

        expect(getFirstQuery('http://test.com?a=2+2', 'a')).toBe('2 2');
        expect(getFirstQuery('http://test.com?%40a=2+2', '@a')).toBe('2 2');
        expect(getFirstQuery('http://test.com?%40a=%402', '@a')).toBe('@2');
    });
});
