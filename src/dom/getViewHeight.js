var getViewHeight = function (win) {
    win = win || window;
    var doc = win.document;
    var client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;
    return client.clientHeight;
};

export default getViewHeight;
