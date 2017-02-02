import mqp from 'S3/util/mqp';

describe('S3/util/mqp', function() {
    it('mqp', function() {
        function Father() {
            this.firstName = 'jinx';
            this.lastName = 'zhou';
        }
        Father.prototype.myName = function () {
            return this.firstName + this.lastName;
        };
        Father.prototype.intro = function () {
            return 'I\'m a father.';
        };

        function Son() {
            this.firstName = 'mm';
            this.lastName = 'zhou';
        }
        Son.prototype.intro = function () {
            return 'I\'m a son.';
        };

        inherits(Son, Father);
        var f = new Father();
        var s = new Son();
        expect(f.myName()).toBe('jinxzhou');
        expect(s.myName()).toBe('mmzhou');
        expect(f.intro()).toBe('I\'m a father.');
        expect(s.intro()).toBe('I\'m a son.');
        expect(Son.superClass).toBe(Father.prototype);
    });
});
