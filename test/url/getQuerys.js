import getQuerys from 'S3/url/getQuerys';

describe('S3/url/getQuerys', function() {
    it('getQuerys(url)', function () {
        expect(getQuerys('')).toEqual({});
        expect(getQuerys('#a=2')).toEqual({});
        expect(getQuerys('http://example.com')).toEqual({});
        expect(getQuerys('http://example.com?')).toEqual({});

        expect(getQuerys('http://example.com?a=1')).toEqual({a: '1'});
        expect(getQuerys('http://example.com?a=1&b=1')).toEqual({a: '1', b: '1'});
        expect(getQuerys('http://example.com?b=b&a=1&b=1&a=c&a=3')).toEqual({a: ['1', 'c', '3'], b: ['b', '1']});
        expect(getQuerys('http://example.com?c=2&a=1&b=1')).toEqual({a: '1', b: '1', c: '2'});
        expect(getQuerys('http://example.com?c=2&a=1&a&a=&b=1')).toEqual({a: ['1', ''], b: '1', c: '2'});
        expect(getQuerys('http://example.com?c=2&a=1&d&b=1')).toEqual({a: '1', b: '1', c: '2'});

        expect(getQuerys('?a=1')).toEqual({a: '1'});
        expect(getQuerys('?a=1&b=1')).toEqual({a: '1', b: '1'});
        expect(getQuerys('?b=b&a=1&b=1&a=c&a=3')).toEqual({a: ['1', 'c', '3'], b: ['b', '1']});
        expect(getQuerys('?c=2&a=1&b=1')).toEqual({a: '1', b: '1', c: '2'});
        expect(getQuerys('?c=2&a=1&a&a=&b=1')).toEqual({a: ['1', ''], b: '1', c: '2'});
        expect(getQuerys('?c=2&a=1&d&b=1')).toEqual({a: '1', b: '1', c: '2'});

        expect(getQuerys('a=1')).toEqual({a: '1'});
        expect(getQuerys('a=1&b=1')).toEqual({a: '1', b: '1'});
        expect(getQuerys('b=b&a=1&b=1&a=c&a=3')).toEqual({a: ['1', 'c', '3'], b: ['b', '1']});
        expect(getQuerys('c=2&a=1&b=1')).toEqual({a: '1', b: '1', c: '2'});
        expect(getQuerys('c=2&a=1&a&a=&b=1')).toEqual({a: ['1', ''], b: '1', c: '2'});
        expect(getQuerys('c=2&a=1&d&b=1')).toEqual({a: '1', b: '1', c: '2'});

        expect(getQuerys('http://example.com?a=1#a=2')).toEqual({a: '1'});
        expect(getQuerys('http://example.com?a=1&b=1#a=2')).toEqual({a: '1', b: '1'});
        expect(getQuerys('http://example.com?b=b&a=1&b=1&a=c&a=3#a=2')).toEqual({a: ['1', 'c', '3'], b: ['b', '1']});
        expect(getQuerys('http://example.com?c=2&a=1&b=1#a=2')).toEqual({a: '1', b: '1', c: '2'});
        expect(getQuerys('http://example.com?c=2&a=1&a&a=&b=1#a=2')).toEqual({a: ['1', ''], b: '1', c: '2'});
        expect(getQuerys('http://example.com?c=2&a=1&d&b=1#a=2')).toEqual({a: '1', b: '1', c: '2'});

        expect(getQuerys('http://example.com:8000?a=1')).toEqual({a: '1'});
        expect(getQuerys('http://example.com:8000?a=1&b=1')).toEqual({a: '1', b: '1'});
        expect(getQuerys('http://example.com:8000?b=b&a=1&b=1&a=c&a=3')).toEqual({a: ['1', 'c', '3'], b: ['b', '1']});
        expect(getQuerys('http://example.com:8000?c=2&a=1&b=1')).toEqual({a: '1', b: '1', c: '2'});
        expect(getQuerys('http://example.com:8000?c=2&a=1&a&a=&b=1')).toEqual({a: ['1', ''], b: '1', c: '2'});
        expect(getQuerys('http://example.com:8000?c=2&a=1&d&b=1')).toEqual({a: '1', b: '1', c: '2'});
    });
});
