import toQuery from 'S3/url/toQuery';
import getQuery from 'S3/url/getQuery';

describe('S3/url/toQuery', function() {
    it('toQuery(Object)', function () {
        var obj = toQuery({
            a: 1,
            b: 2,
            _c: 3,
            '?d&': 4,
            'arr': [5, 6, 7]
        });
        var query = toQuery(obj);
        expect(getQuery(query, 'a')).toBe('1');
        expect(getQuery(query, 'b')).toBe('2');
        expect(getQuery(query, '_c')).toBe('3');
        expect(getQuery(query, '%3Fd%26')).toBe('4');
        console.log(query);
        expect(query.indexOf('arr%5B%5D=5&arr%5B%5D=6&arr%5B%5D=7') > 0).toBeTruthy();
    });

    it('toQuery(Array)', function () {
        var obj = [
            {
                key: '_c',
                value: 3
            },
            {
                key: 'b',
                value: '2'
            },
            {
                key: 'a',
                value: 1
            },
            {
                key: '?d&',
                value: 4
            }
        ];
        var query = toQuery(obj);
        expect(query).toBe('_c=3&b=2&a=1&%3Fd%26=4');
        obj.push({
            key: 'arr',
            value: [
                {
                    key: 'f',
                    value: '5'
                },
                {
                    key: 'g',
                    value: 6
                }
            ]
        });
        query = toQuery(obj);
        console.log(decodeURIComponent(query));
        expect(query).toBe('_c=3&b=2&a=1&%3Fd%26=4&arr%3Ff%26=5&arr%3Fg%26=6');
    });

    it('toQuery(any)', function () {
        expect(toQuery('')).toBe('');
        expect(toQuery(1)).toBe('1');
        expect(toQuery(true)).toBe('true');
        expect(toQuery(false)).toBe('');
        expect(toQuery(null)).toBe('');
        expect(toQuery()).toBe('');
    });
});
