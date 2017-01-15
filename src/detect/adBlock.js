import attachIntoDOM from '../dom/attachIntoDOM';
var adBlock = function () {
    var win = window;
    var doc = win.document;
    var ads = doc.createElement('div');
    ads.setAttribute('id', 'ads');
    var hasAdBlock = false;
    try {
        // body may not exist, that's why we need try/catch
        attachIntoDOM(ads, win);
        hasAdBlock = !!doc.getElementById('ads');
    }
    catch (e) {}

    if (hasAdBlock && ads.parentNode) {
        ads.parentNode.removeChild(ads);
    }
    return hasAdBlock;
};

export default adBlock;
