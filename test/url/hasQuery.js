import hasQuery from 'S3/url/hasQuery';

describe('S3/url/hasQuery', function() {
    it('hasQuery(url, key)', function () {
        expect(hasQuery('http://192.168.1.2:8000?a=1', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?a=1', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?a=1#a=2', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?a=1#?a=2', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?%40a=1', '@a')).toBeTruthy();
        expect(hasQuery('http://test.com#?a=2', 'a')).toBeFalsy();
        expect(hasQuery('http://test.com', 'a')).toBeFalsy();
        expect(hasQuery('?a=1', 'a')).toBeTruthy();
    });
});
