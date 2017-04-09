import submitByIframe from './_submitByIframe';
import globalSandbox from '../sandbox/global';
import parseJSON from '../json/parse';

/**
 * XMLHttpRequest
 * @param {string} url request url
 * @param {string|FormData} params request params.
 * @param {function(Error=, Object|string)=} callback callback executed after form created
 *                                          or options.
 * @param {Object} opts options.
 * @param {String} opts.dataType Only support json or text.
 */
export default function xhr(url, params, callback, opts) {
    var XHR = globalSandbox().XMLHttpRequest;
    var xhr = new XHR();
    xhr.open('POST', url, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (callback) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            var status = xhr.status;
            var isSuccess = status >= 200 && status < 400;
            var error = null;
            if (!isSuccess) {
                var errorName = '[S3][request] XHR ' + (status < 500 ? 'ClientError' : 'ServerError');
                error = new Error(errorName + ' ' + status);
                error.name = errorName;
            }

            var isJSONType = (opts && opts.dataType || 'text').toLowerCase() === 'json';
            var data = isJSONType && (xhr.responseType === 'json')
                ? xhr.response
                : (isJSONType ? parseJSON(xhr.responseText || '') : xhr.responseText);
            callback(error, data);
        };
    }
    xhr.send(params);
}
