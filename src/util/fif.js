import createByHTML from '../iframe/createByHTML';

/**
 * Friendly iframe or Frame in Frame
 * Loaded javascript without blocking the onload event.
 * Runing those scripts in a isolated iframe more safe and stable.
 *
 * @param {string|Array.<string>} url script url or urls
 * @param {function (Window, Document)} callback executed after scripts loaded
 * @param {Object=} opts options
 * @param {string=} opts.fifMark global variable in iframe to help script locate there position
 * @param {document=} opts.context option document
 * @return {Element} iframe DOM element
 */
var fif = function (url, callback, opts) {
    opts['visible'] = false;
    // This global variable is called inDapIF and is defined by IAB (Interactive Advertising Bureau).
    // http://www.iab.net/media/file/rich_media_ajax_best_practices.pdf
    var fifMark = opts['fifMark'] || 'inDapIF';
    var html = '<script>window.' + fifMark + '=true;</script>';

    if (typeof url === 'string') {
        html += '<script src="' + url + '"></script>';
    }
    else {
        for (var i = 0; i < url.length; i++) {
            html += '<script src="' + url[i] + '"></script>';
        }
    }

    return createByHTML(html, callback, opts);
};


export default fif;
