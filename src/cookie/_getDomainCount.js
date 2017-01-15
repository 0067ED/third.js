/**
 * normalize domain.
 * remove the first '.' if exist.
 * @param {string} domain domain String
 * @return {string} normalized domain
 */
var normalizeDomain = function (domain) {
    return domain.indexOf('.') === 0 ? domain.substr(1) : domain;
};

/**
 * get count of domain.
 * getDomainCount('qq.com') === 2
 * getDomainCount('.qq.com') === 2
 * getDomainCount('b.qq.com') === 3
 * getDomainCount('com') === 1
 * getDomainCount('e.qidian.qq.com') === 4
 *
 * @param {string} domain domain String
 * @return {string} normalized domain
 */
var getDomainCount = function (domain) {
    return normalizeDomain(domain).split('.').length;
};

export default getDomainCount;
