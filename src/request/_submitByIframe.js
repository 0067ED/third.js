import createForm from './_createForm';
import listen from '../message/listen';
import unlisten from '../message/unlisten';
import isWindow from '../lang/isWindow';
import uuid from '../lang/uuid';
// import parseUrl from '../url/parse';
import parseJSON from '../json/parse';

import createAnonymousIframe from '../iframe/createAnonymous';
import attachIntoDOM from '../dom/attachIntoDOM';

var S3_SUBMIT_CHANNEL_NAME = 'S3SUBMIT_CHANNEL_';
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
 * @param {String} opts.query query name of callback.
 * @param {String} opts.dataType Only support JSON or text.
 */
export default function submitByIframe(url, params, callback, opts) {
    var useForm = typeof url !== 'string';
    var form;
    if (useForm) {
        form = url;
        opts = callback;
        callback = params;
        url = form.action;
    }

    var channelName = S3_SUBMIT_CHANNEL_NAME + uuid('_');
    var query = opts && opts.query || 'callback';
    url += (url.indexOf('?') < 0 ? '?' : '&') + query + '=' + channelName;
    if (useForm) {
        form.action = url;
    }

    var context = opts && opts.context || window;
    var dataType = (opts && opts.dataType || 'json').toLowerCase();
    // listen respond
    listen(channelName, context, function thisCallback(data) {
        unlisten(channelName, context, thisCallback);
        /*
        var apiOrigin = parseUrl(url).origin;
        if (data.origin !== apiOrigin) {
            return;
        }
        */
        data = dataType === 'json' ? parseJSON(data.message) : data.message;
        callback(null, data);
    });

    if (!useForm) {
        // submitByIframe('/api', {test: 1}, function, opts);
        var formIframe = createForm(url, params, function (form, win) {
            form.submit();
        }, opts);
    }
    else if (form.nodeName === 'FORM') {
        // submitByIframe(form, function, opts);
        var iframeId = S3_SUBMIT_IFRAME_ID + uuid('_');
        var iframe = createAnonymousIframe(context);
        iframe.id = iframeId;
        form.setAttribute('target', iframeId);
        attachIntoDOM(iframe, context);
        form.submit();
    }
};
