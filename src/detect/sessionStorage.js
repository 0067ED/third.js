import uuid from '../lang/uuid';

var sessionStorageDetect = function () {
    var sessionName = 'THIRDSESSIONSTORAGE' + uuid();
    var api = 'sessionStorage';
    try {
        window[api].setItem(sessionName, 1);
        window[api].removeItem(sessionName);
        return true;
    }
    catch (e) {
        return false;
    }
};

export default sessionStorageDetect;
