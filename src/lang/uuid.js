import random from './random';
var uuid = function (join) {
    join = join || '.';
    return random().toString(36)
        + join + random().toString(36)
        + join + random().toString(36)
        + join + (+new Date()).toString(36);
};

export default uuid;
