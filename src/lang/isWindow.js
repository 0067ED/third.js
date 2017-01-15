var isWindow = function (obj) {
    /* eslint eqeqeq: 0 */
    return obj != null && obj == obj.window;
};

export default isWindow;
