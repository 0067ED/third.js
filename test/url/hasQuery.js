import hasQuery from 'third/url/hasQuery';

describe('third/url/hasQuery', function() {
    it('hasQuery(url, key)', function () {
        expect(hasQuery('http://192.168.1.2:8000?a=1', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?a=1', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?a=1#a=2', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?a=1#?a=2', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?%40a=1', '@a')).toBeTruthy();
        expect(hasQuery('http://test.com#?a=2', 'a')).toBeFalsy();
        expect(hasQuery('http://test.com?a=', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com?a=&b=1', 'a')).toBeTruthy();
        expect(hasQuery('http://test.com', 'a')).toBeFalsy();
        expect(hasQuery('?a=1', 'a')).toBeTruthy();
    });
});
