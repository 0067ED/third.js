import type from './type';

var isArray = function (arr) {
    return type(arr) === 'array';
};

export default isArray;
