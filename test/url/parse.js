import parse from 'S3/url/parse';

describe('S3/url/parse', function() {
    it('parse(absoluteUrl)', function () {
        var url = parse('https://example.com:80/books/123/?a=1&b=3#hashid');
        expect(url.host).toBe('example.com');
        expect(url.path).toBe('/books/123/');
        expect(url.port).toBe('80');
        expect(url.protocol).toBe('https:');
        expect(url.query).toBe('?a=1&b=3');
        expect(url.url).toBe('https://example.com:80/books/123/?a=1&b=3');
        var url = parse('https://example.com/books/123/?a=1&b=3#hashid');
        expect(url.port).toBe('443');
        var url = parse('http://example.com/books/123/?a=1&b=3#hashid');
        expect(url.port).toBe('80');
        expect(url.url).toBe('http://example.com:80/books/123/?a=1&b=3');
        var url = parse('https://example.com:8000/books/123/?a=1&b=3#hashid');
        expect(url.host).toBe('example.com');
    });

    it('parse(relativeUrl)', function () {
        var url = parse('books/123/?a=1&b=3#hashid');
        expect(url.host).toBe('localhost');
        expect(url.path).toBe('/books/123/');
        expect(url.port).toBe('9876');
        expect(url.protocol).toBe('http:');
        expect(url.query).toBe('?a=1&b=3');
        expect(url.url).toBe('http://localhost:9876/books/123/?a=1&b=3');
    });

    it('parse(relativeUrl, baseUrl)', function () {
        var url = parse('books/123/?a=1&b=3#hashid', 'https://example.com/user/123/');
        expect(url.host).toBe('example.com');
        expect(url.path).toBe('/user/123/books/123/');
        expect(url.port).toBe('443');
        expect(url.protocol).toBe('https:');
        expect(url.query).toBe('?a=1&b=3');
        expect(url.url).toBe('https://example.com:443/user/123/books/123/?a=1&b=3');

        var url = parse('../../books/123/?a=1&b=3#hashid', 'https://example.com/user/123/');
        expect(url.host).toBe('example.com');
        expect(url.path).toBe('/books/123/');
        expect(url.port).toBe('443');
        expect(url.protocol).toBe('https:');
        expect(url.query).toBe('?a=1&b=3');
        expect(url.url).toBe('https://example.com:443/books/123/?a=1&b=3');
    });
});
