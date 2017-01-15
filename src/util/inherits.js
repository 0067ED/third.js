/**
 * Simple inherits function.
 *
 * @param {Function} SubClass sub class.
 * @param {Function} SuperClass super class.
 */
var inherits = function (SubClass, SuperClass) {
    var selfProps = SubClass.prototype;
    var Clazz = /** @constructor */ function () {};
    Clazz.prototype = SuperClass.prototype;

    var proto = SubClass.prototype = new Clazz();
    for (var key in selfProps) {
        if (selfProps.hasOwnProperty(key)) {
            proto[key] = selfProps[key];
        }
    }
    SubClass.prototype.constructor = SubClass;
    SubClass.superClass = SuperClass.prototype;
};

export default inherits;
