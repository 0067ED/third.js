/**
 * remove Last '?' or '&' mark.
 *
 * @param {string} url URL location
 * @return {string} updated url string.
 */
var removeLastSplit = function (url) {
    var lastIndex = url.charAt(url.length - 1);
    if (lastIndex === '&' || lastIndex === '?') {
        // 'name=1&' => 'name=1'
        url = url.slice(0, -1);
    }
    return url;
};

export default removeLastSplit;
