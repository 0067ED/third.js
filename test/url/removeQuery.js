import removeQuery from 'S3/url/removeQuery';

describe('S3/url/removeQuery', function() {
    it('removeQuery(url, key)', function () {
        expect(removeQuery('http://example.com?a=1', 'a')).toBe('http://example.com');
        expect(removeQuery('http://example.com?a=1&b=2', 'a')).toBe('http://example.com?b=2');
        expect(removeQuery('http://example.com?b=2&a=2', 'a')).toBe('http://example.com?b=2');
        expect(removeQuery('http://example.com?b=2&a=2&c=a', 'a')).toBe('http://example.com?b=2&c=a');
        expect(removeQuery('http://example.com?b=2&a=2#a=1', 'a')).toBe('http://example.com?b=2#a=1');
        expect(removeQuery('http://example.com?b=2&a=2#a=1', 'a')).toBe('http://example.com?b=2#a=1');
        expect(removeQuery('http://example.com?b=2&b=2#a=1', 'a')).toBe('http://example.com?b=2&b=2#a=1');
        expect(removeQuery('http://example.com?a=1&b=2#a=1', 'a')).toBe('http://example.com?b=2#a=1');
    });
});
