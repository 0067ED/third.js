var sendBeacon = function () {
    return 'sendBeacon' in window.navigator;
};

export default sendBeacon;
