import createForm from './_createForm';
import listen from '../message/listen';
import isWindow from '../lang/isWindow';
import uuid from '../lang/uuid';
import parseJSON from '../json/parse';

import createAnonymousIframe from '../iframe/createAnonymous';
import attachIntoDOM from '../dom/attachIntoDOM';

var S3_SUBMIT_CHANNEL_NAME = 'S3SUBMIT_CHANNEL_4657fb088b5cd68c122890a678f64846';
var S3_SUBMIT_IFRAME_ID = 'S3SUBMIT_IFRAME_';

/**
 * create iframe form
 * @param {string|Element} url form action url
 *                         or form element.
 * @param {Object|function(Object|string|Error)} params params data
 *                                          or callback executed after form created.
 * @param {function(Object|string)|Object} callback callback executed after form created
 *                                          or options.
 * @param {Object} opts options.
 * @param {Window} opts.context window.
 * @param {String} opts.charset charset.
 * @param {String} opts.dataType Only support JSON or text.
 */
export default function submitByIframe(url, param, callback, opts) {
    var useForm = typeof url !== 'string';
    var form;
    if (useForm) {
        form = url;
        opts = callback;
        callback = params;
        url = form.action;
    }

    if (!useForm || form.nodeName === 'FORM') {
        callback(new Error('[S3][request][submitByIframe] Wrong parameter.'));
        return;
    }

    var context = opts && opts.context || window;
    var dataType = (opts && opts.dataType || 'json').toLowerCase();
    // listen respond
    listen(S3_SUBMIT_CHANNEL_NAME, context, function (data) {
        data = dataType === 'json' ? parseJSON(data.message) : data.message;
        callback(data);
    });

    if (!useForm) {
        // submitByIframe('/api', {param: 1}, function, opts);
        var formIframe = createForm(url, param, function (form, win) {
            form.submit();
        }, opts);
    }
    else if (form.nodeName === 'FORM') {
        // submitByIframe(form, function, opts);
        var iframeId = S3_SUBMIT_IFRAME_ID + uuid('_');
        var iframe = createAnonymous(context);
        iframe.id = iframeId;
        form.setAttribute('target', iframeId);
        attachIntoDOM(iframe, context);
        form.submit();
    }
};
