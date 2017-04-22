import uuid from '../lang/uuid';

var localstorageDetect = function () {
    var name = 'THIRDLOCALSTORAGE' + uuid();
    var api = 'localStorage';
    try {
        window[api].setItem(name, 1);
        window[api].removeItem(name);
        return true;
    }
    catch (e) {
        return false;
    }
};

export default localstorageDetect;
