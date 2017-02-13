import toArray from 'S3/lang/toArray';

describe('S3/lang/toArray', function() {
    var main;
    beforeEach(function() {
        main = document.createElement('div');
        main.innerHTML = ''
            + '<span>a</span>'
            + '<span>b</span>'
            + '<span>c</span>';
        document.body.appendChild(main);
    });

    afterEach(function() {
        document.body.removeChild(main);
    });

    it('toArray(input)', function () {
        expect(toArray('abc')).toEqual(['a', 'b', 'c']);
        function test() {
            expect(toArray(arguments)).toEqual(['a', 'b', 'c']);
        }
        test('a', 'b', 'c');
        var spans = toArray(main.getElementsByTagName('span'));
        expect(Object.prototype.toString.call(spans)).toBe('[object Array]');
        expect(spans.length).toBe(3);
        expect(spans[0].innerHTML).toBe('a');
        expect(spans[1].innerHTML).toBe('b');
        expect(spans[2].innerHTML).toBe('c');
    });

    it('toArray(input, start)', function () {
        expect(toArray('abc', 1)).toEqual(['b', 'c']);
        function test() {
            expect(toArray(arguments, 1)).toEqual(['b', 'c']);
        }
        test('a', 'b', 'c');
        var spans = toArray(main.getElementsByTagName('span'), 2);
        expect(Object.prototype.toString.call(spans)).toBe('[object Array]');
        expect(spans.length).toBe(1);
        expect(spans[0].innerHTML).toBe('c');
    });

    it('toArray(input, -start)', function () {
        expect(toArray('abc', -2)).toEqual(['b', 'c']);
        function test() {
            expect(toArray(arguments, -2)).toEqual(['b', 'c']);
        }
        test('a', 'b', 'c');
        var spans = toArray(main.getElementsByTagName('span'), -1);
        expect(Object.prototype.toString.call(spans)).toBe('[object Array]');
        expect(spans.length).toBe(1);
        expect(spans[0].innerHTML).toBe('c');
    });

    it('toArray(input, null, end)', function () {
        expect(toArray('abc', null, 2)).toEqual(['a', 'b']);
        function test() {
            expect(toArray(arguments, null, 2)).toEqual(['a', 'b']);
        }
        test('a', 'b', 'c');
        var spans = toArray(main.getElementsByTagName('span'), null, 2);
        expect(Object.prototype.toString.call(spans)).toBe('[object Array]');
        expect(spans.length).toBe(2);
        expect(spans[0].innerHTML).toBe('a');
        expect(spans[1].innerHTML).toBe('b');
    });

    it('toArray(input, null, -end)', function () {
        expect(toArray('abc', null, -1)).toEqual(['a', 'b']);
        function test() {
            expect(toArray(arguments, null, -1)).toEqual(['a', 'b']);
        }
        test('a', 'b', 'c');
        var spans = toArray(main.getElementsByTagName('span'), null, -1);
        expect(Object.prototype.toString.call(spans)).toBe('[object Array]');
        expect(spans.length).toBe(2);
        expect(spans[0].innerHTML).toBe('a');
        expect(spans[1].innerHTML).toBe('b');
    });

    it('toArray(input, start, end)', function () {
        expect(toArray('abc', 1, 2)).toEqual(['b']);
        function test() {
            expect(toArray(arguments, 1, 2)).toEqual(['b']);
        }
        test('a', 'b', 'c');
        var spans = toArray(main.getElementsByTagName('span'), 1, 2);
        expect(Object.prototype.toString.call(spans)).toBe('[object Array]');
        expect(spans.length).toBe(1);
        expect(spans[0].innerHTML).toBe('b');
    });

    it('toArray(input, -start, -end)', function () {
        expect(toArray('abc', -2, -4)).toEqual(['b']);
        function test() {
            expect(toArray(arguments, -5, -1)).toEqual(['b']);
        }
        test('a', 'b', 'c');
        var spans = toArray(main.getElementsByTagName('span'), -8, -7);
        expect(Object.prototype.toString.call(spans)).toBe('[object Array]');
        expect(spans.length).toBe(1);
        expect(spans[0].innerHTML).toBe('b');
    });
});
