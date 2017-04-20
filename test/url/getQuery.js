import getQuery from 'S3/url/getQuery';

describe('S3/url/getQuery', function() {
    it('getQuery(url, key)', function () {
        expect(getQuery('http://192.168.1.2:8000?a=1', 'a')).toBe('1');
        expect(getQuery('http://test.com?a=1', 'a')).toBe('1');
        expect(getQuery('http://test.com?b=2&a=1&b=1', 'a')).toBe('1');
        expect(getQuery('http://test.com?a=1#a=2', 'a')).toBe('1');
        expect(getQuery('http://test.com?a=1#?a=2', 'a')).toBe('1');
        expect(getQuery('http://test.com?b=1#?a=2', 'a')).toBe('');
        expect(getQuery('http://test.com?a=&b=1', 'a')).toBe('');
        expect(getQuery('http://test.com?a=', 'a')).toBe('');
        expect(getQuery('http://test.com', 'a')).toBe('');
        expect(getQuery('?a=1', 'a')).toBe('1');

        expect(getQuery('http://test.com?a=2+2', 'a')).toBe('2 2');
        expect(getQuery('http://test.com?%40a=2+2', '@a')).toBe('2 2');
        expect(getQuery('http://test.com?%40a=%402', '@a')).toBe('@2');
    });


    it('getQuery(url, key):Array.<string>', function () {
        expect(getQuery('http://test.com?a=1&a=2', 'a')).toEqual(['1', '2']);
        expect(getQuery('http://test.com?a=1&b=2&a=2&a=3', 'a')).toEqual(['1', '2', '3']);
        expect(getQuery('http://test.com?a=1&b=2&a=2&a=3#a=2', 'a')).toEqual(['1', '2', '3']);
        expect(getQuery('http://test.com?a=1&b=2&a=2&a=2&b=2', 'a')).toEqual(['1', '2', '2']);
        expect(getQuery('http://test.com?b=2&a=2&a=2&b=2', 'a')).toEqual(['2', '2']);
        expect(getQuery('http://test.com?a=3&a=2&b=2', 'a')).toEqual(['3', '2']);
    });
});
