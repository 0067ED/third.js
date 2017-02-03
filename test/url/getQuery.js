import getQuery from 'S3/url/getQuery';

describe('S3/url/getQuery', function() {
    it('getQuery(url, key)', function () {
        expect(getQuery('http://192.168.1.2:8000?a=1', 'a')).toBe('1');
        expect(getQuery('http://test.com?a=1', 'a')).toBe('1');
        expect(getQuery('http://test.com?a=1#a=2', 'a')).toBe('1');
        expect(getQuery('http://test.com?a=1#?a=2', 'a')).toBe('1');
        expect(getQuery('http://test.com', 'a')).toBe('');
        expect(getQuery('?a=1', 'a')).toBe('1');
    });
});
