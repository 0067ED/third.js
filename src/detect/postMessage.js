var postMessageDetect = function () {
    return 'postMessage' in window;
};

export default postMessageDetect;
