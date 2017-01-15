import getDomain from './get';
var equalDomain = function (urlA, urlB) {
    return getDomain(urlA) === getDomain(urlB);
};

export default equalDomain;
