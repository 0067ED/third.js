import type from './type';

/**
 * is pure Object or not.
 * @param {*} obj any input.
 * @return {boolean} is pure Object or not.
 */
export default function (obj) {
    return obj
        && (type(obj) === 'object')
        // not node
        && !obj.nodeType
        // not window
        && (obj !== obj.window);
};
