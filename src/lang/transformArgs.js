import isWindow from './isWindow';
import type from './type';

/**
 * @param {*} object anything.
 * @return {string} first char of type.
 *              b => Boolean
 *              s => String
 *              o => Object
 *              a => Array
 *              n => Number
 *              f => Function
 *              w => Window
 */
var firstType = function (object) {
    var t = type(object);
    if (t === 'object' && isWindow(object)) {
        return 'w';
    }

    return t.charAt(0);
};

/**
 * Transform and validate input of function.
 * @param {number} required required argument count.
 * @param {string} argTypes eg: 'sabwbf'.
 * @param {Function} func function.
 * @return {Function} transformed function.
 */
var transformArgs = function (required, argTypes, func) {
    return function () {
        if (arguments.length < required) {
            throw new Error('Require ' + required + ' argument.');
        }

        var len = argTypes.length;
        var args = new Array(len);

        for (var i = 0; i < arguments.length; i++) {
            var arg = arguments[i];
            var t = firstType(arg);

            if (i < required) {
                if (argTypes[i] !== t) {
                    throw new Error('Argument: ' + arg + ' type error.');
                }

                args[0] = arg;
            }
            else {
                for (var j = required; j < len; j++) {
                    if (args[j] == null && argTypes[j] === t) {
                        args[j] = arg;
                    }
                }
            }
        }

        func.apply(this, args);
    };
};

export default transformArgs;
