import escapeHTML from '../lang/escapeHTML';
import isArray from '../lang/isArray';
import createIframeByHTML from '../iframe/createByHTML';

/**
 * Create an form inside an friendly iframe.
 * @param {string} url form action url.
 * @param {Object} params params data.
 * @param {function(Element, Window)} callback executed after form created.
 * @param {Object=} opts options.
 * @param {Window} opts.context window.
 * @param {String} opts.charset charset.
 * @return {Element} iframe element.
 */
var createForm = function (url, params, callback, opts) {
    var optsIsUndefined = opts == null;
    var context = opts && opts.context || window;
    var charset = opts && opts.charset || 'UTF-8';

    // create form
    var html = '';
    /**
     * create input，and append into form
     *
     * @param {string} key .
     * @param {boolean|string|number} value .
     */
    function appendInput(key, value) {
        // use empty string instead, if no values.
        value = value == null ? '' : value;
        html += ''
            + '<input type="text" '
            + 'name="' + encodeHTML(key) + '" '
            + 'value="' + encodeHTML(value.toString()) + '"/>';
    }
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var value = data[key];
            if (isArray(value)) {
                key += '[]';
                for (var i = 0, l = value.length; i < l; i++) {
                    appendInput(key, value[i]);
                }
            }
            else {
                appendInput(key, value);
            }
        }
    }

    html = ''
        + '<!DOCTYPE html>'
        + '<html lang="en">'
        + '<head>'
        +     '<meta charset="' + charset + '">'
        + '</head>'
        + '<body>'
        +     '<form id="S3FAKEFORM"'
        +         'action="' + url + '" '
        +         'method="POST" '
        +         'enctype="application/x-www-form-urlencoded">'
        +         html
        +     '</form>'
        + '</body>'
        + '</html>';

    return createIframeByHTML(html, function (win, doc) {
        var form = doc.getElementById('S3FAKEFORM');
        if (callback) {
            callback(form, win);
        }
    }, context);
};

export default jsonp;
