import submitByIframe from './_submitByIframe';
import xhrRequest from './_xhr';
import globalSandbox from '../sandbox/global';
import toQuery from '../url/toQuery';
import hasCors from '../detect/cors';

var supportXHR = hasCors() === 'xhr';

var submit = supportXHR
    ? function (url, params, callback, opts) {
        var useForm = typeof url !== 'string';
        var form;
        if (useForm) {
            form = url;
            opts = callback;
            callback = params;
            url = form.action;
        }

        var data;
        if (!useForm) {
            // submit('/api', {param: 1}, function, opts);
            data = toQuery(params);
        }
        else if (form.nodeName === 'FORM') {
            // submit(form, function, opts);
            var FormData = globalSandbox().FormData;
            if (typeof FormData !== 'function') {
                // not support form data use iframe instead.
                submitByIframe(form, callback, opts);
                return;
            }
            data = new FormData(form);
        }
        xhrRequest(url, data, callback, opts);
    }
    : submitByIframe;

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
export default submit;
