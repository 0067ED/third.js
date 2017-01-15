import setRaw from './setRaw';

/**
 * Set raw cookie in root domain and root path.
 *
 * @param {string} key cookie name.
 * @param {string} value cookie value.
 * @param {Window=} win window context.
 * @param {number=} expires cookie expired time in milliseconds.
 * @param {Array.<string>=} extraBlackList ['exampleA.com', 'B.com']
 * @return {string} if success return root domain, otherwise return empty string.
 */
var setRootRaw = function (key, value, win, expires, extraBlackList) {
    var domainBlackList = {
        '.com': 1,
        '.net': 1,
        '.org': 1,
        '.edu': 1,
        '.gov': 1,
        '.cn': 1,
        '.tw': 1,
        '.hk': 1
    };
    var i;
    if (extraBlackList) {
        for (i = 0; i < extraBlackList.length; i++) {
            domainBlackList['.' + extraBlackList[i]] = 1;
        }
    }

    var hostname = win.location.hostname;
    var domains = hostname.split('.');
    var domainLength = domains.length;
    var rootDomain = '';
    var subDomain = '';
    for (i = domainLength - 1; i >= 0; i--) {
        subDomain = '.' + domains[i] + subDomain;
        if (domainBlackList[subDomain]) {
            continue;
        }

        var success = setRaw(key, value, win, expires, subDomain, '/');
        if (success) {
            rootDomain = subDomain;
            break;
        }
    }

    return rootDomain;
};

export default setRootRaw;
