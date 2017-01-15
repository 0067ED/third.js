var touchEvents = function () {
    var api = 'DocumentTouch';
    return !!(('ontouchstart' in window)
        || window[api] && document instanceof window[api]);
};

export default touchEvents;
