var random = function () {
    var random;

    // https://zh.wikipedia.org/wiki/2147483647
    // 2147483647 === 1111111111111111111111111111111
    try {
        var arr = new Uint32Array(1);
        // https://developer.mozilla.org/en-US/docs/Web/API/RandomSource/getRandomValues
        window.crypto.getRandomValues(arr);
        random = arr[0] & 2147483647;
    }
    catch (b) {
        random = Math.floor(Math.random() * 2147483648);
    }

    return random;
};

export default random;
