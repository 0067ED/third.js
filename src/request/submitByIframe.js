import createForm from './_createForm';
import listen from '../message/listen';
import isWindow from '../lang/isWindow';
import uuid from '../lang/uuid';
import parseJSON from '../json/parse';

import createAnonymousIframe from '../iframe/createAnonymous';
import attachIntoDOM from '../dom/attachIntoDOM';

const S3_SUBMIT_CHANNEL_NAME = 'S3SUBMIT_CHANNEL_4657fb088b5cd68c122890a678f64846';
const S3_SUBMIT_IFRAME_ID = 'S3SUBMIT_IFRAME_';

/**
 * create iframe form
 * @param {string} url form action url.
 * @param {Object} params params data.
 * @param {function(Element, Window)} callback executed after form created.
 * @param {Object|Window} opts options.
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
        callback = param;
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

    // should throw error.
};
