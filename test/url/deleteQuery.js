import deleteQuery from 'S3/url/deleteQuery';

describe('S3/url/deleteQuery', function() {
    it('deleteQuery(url, key)', function () {
        expect(deleteQuery('http://example.com?a=1', 'a')).toBe('http://example.com');
        expect(deleteQuery('http://example.com?a=1&b=2', 'a')).toBe('http://example.com?b=2');
        expect(deleteQuery('http://example.com?b=2&a=2', 'a')).toBe('http://example.com?b=2');
        expect(deleteQuery('http://example.com?b=2&a=2&c=a', 'a')).toBe('http://example.com?b=2&c=a');
        expect(deleteQuery('http://example.com?b=2&a=2#a=1', 'a')).toBe('http://example.com?b=2#a=1');
        expect(deleteQuery('http://example.com?b=2&a=2#a=1', 'a')).toBe('http://example.com?b=2#a=1');
        expect(deleteQuery('http://example.com?b=2&b=2#a=1', 'a')).toBe('http://example.com?b=2&b=2#a=1');
        expect(deleteQuery('http://example.com?a=1&b=2#a=1', 'a')).toBe('http://example.com?b=2#a=1');
    });
});