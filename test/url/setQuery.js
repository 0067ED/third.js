import setQuery from 'S3/url/setQuery';

describe('S3/url/setQuery', function() {
    it('setQuery(url, key, value)', function () {
        expect(setQuery('http://example.com', 'a', 'c')).toEqual('http://example.com?a=c');
        expect(setQuery('http://example.com?', 'a', 'c')).toEqual('http://example.com?a=c');
        expect(setQuery('http://example.com', '@a', '@ c')).toEqual('http://example.com?%40a=%40%20c');
        expect(setQuery('http://example.com?a=1', 'a', 'c')).toEqual('http://example.com?a=c');
        expect(setQuery('http://example.com?a=1', 'a', '')).toEqual('http://example.com?a=');
        expect(setQuery('http://example.com?b=1', 'a', 'c')).toEqual('http://example.com?b=1&a=c');
        expect(setQuery('http://example.com?a=2&b=1&a=3&a=4', 'a', '')).toEqual('http://example.com?a=&b=1');
        expect(setQuery('http://example.com?a=2&b=1&a=3&a=4', 'a', 'c')).toEqual('http://example.com?a=c&b=1');
        expect(setQuery('http://example.com?c=1&a=2&b=1&a=3&a=4', 'a', '')).toEqual('http://example.com?c=1&a=&b=1');
        expect(setQuery('http://example.com?c=1&a=2&b=1&', 'a', 'c')).toEqual('http://example.com?c=1&a=c&b=1');
    });

    it('setQuery(url, key, values)', function () {
        expect(setQuery('http://example.com', 'a', [3, 2])).toEqual('http://example.com?a=3&a=2');
        expect(setQuery('http://example.com?', 'a', [3, 2])).toEqual('http://example.com?a=3&a=2');
        expect(setQuery('http://example.com', '@a', [3, '@ c'])).toEqual('http://example.com?%40a=3&%40a=%40%20c');
        expect(setQuery('http://example.com?a=1', 'a', [3, 2])).toEqual('http://example.com?a=3&a=2');
        expect(setQuery('http://example.com?a=1', 'a', ['', 1])).toEqual('http://example.com?a=&a=1');
        expect(setQuery('http://example.com?b=1', 'a', ['c', 'd'])).toEqual('http://example.com?b=1&a=c&a=d');
        expect(setQuery('http://example.com?a=2&b=1&a=3&a=4', 'a', [1, 'c'])).toEqual('http://example.com?a=1&b=1&a=c');
        expect(setQuery('http://example.com?a=2&b=1&a=3&a=4', 'a', ['', 'c'])).toEqual('http://example.com?a=&b=1&a=c');
        expect(setQuery('http://example.com?c=1&a=2&b=1&a=3&a=4', 'a', [1, 2, 3])).toEqual('http://example.com?c=1&a=1&b=1&a=2&a=3');
        expect(setQuery('http://example.com?c=1&a=2&b=1&', 'a', [1, 2, 3])).toEqual('http://example.com?c=1&a=1&b=1&a=2&a=3');
    });
});
