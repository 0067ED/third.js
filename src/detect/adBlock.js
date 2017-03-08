import attachIntoDOM from '../dom/attachIntoDOM';
var adBlock = function () {
    var win = window;
    var doc = win.document;
    var ads = doc.createElement('div');
    ads.setAttribute('id', 'ads');
    attachIntoDOM(ads, win);
    var hasAdBlock = !!doc.getElementById('ads');

    if (hasAdBlock && ads.parentNode) {
        ads.parentNode.removeChild(ads);
    }
    return hasAdBlock;
};

export default adBlock;
