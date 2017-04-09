import globalSandbox from '../sandbox/global';

// Copy from jQuery
// https://github.com/jquery/jquery/blob/a6b0705294d336ae2f63f7276de0da1195495363/src/serialize.js#L14
var SUBMITTER_TYPES = /^(?:submit|button|image|reset)$/i;   // removed file
var SUBMITTABLE = /^(?:input|select|textarea|keygen)/i;
var CRLF = /\r?\n/g;

/**
 * Convert form element into FormData.
 * @param {Element} form form element.
 * @return {FormData} FormData FormData data.
 */
var formToFormData = function (form) {
    var FormData = globalSandbox().FormData;
    if (typeof FormData !== 'function') {
        // not support form data
        return;
    }

    // use FormData
    var formData = new FormData();
    var formElements = form.elements;
    var formElement;
    var feName;
    var feType;
    for (var i = 0, l = formElements.length; i < l; i++) {
        formElement = formElements[i];
        feName = formElement.name;
        feType = formElement.type;
        if (!feName
            || formElement.disabled
            || !SUBMITTABLE.test(formElement.nodeName)
            || SUBMITTER_TYPES.test(feType)) {
            // input with no name,
            // disabled element,
            // not submittable element,
            // submitter type
            continue;
        }

        if (formElement.type === 'file' && formElement.files) {
            // <input type="file" name="fileName" />
            var fileList = formElement.files;
            var j = 0;
            var ll = fileList.length;
            var fileNameKey = formElement.name + (formElement.multiple ? '[]' : '');
            for (; j < ll; j++) {
                formData.append(fileNameKey, fileList[j]);
            }
        }
        else {
            // <input type="text" name="text" />
            // <input type="search" name="search" />
            // <textarea name="desc">text</textarea>
            // <select name="select">...</select>
            // ...
            var feValue = (formElement.value || '').replace(CRLF, '\r\n');
            formData.append(formElement.name, feValue);
        }
    }
    return formData;
};

export default formToFormData;
