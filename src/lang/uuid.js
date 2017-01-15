import random from './random';
var uuid = function () {
    return random().toString(36);
};

export default uuid;
