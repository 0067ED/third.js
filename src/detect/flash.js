/**
 * detect supported flash version.
 * https://github.com/google/closure-library/blob/master/closure/goog/useragent/flash.js
 * @return {string} flash version, empty string if not supported.
 */
var flash = function () {
    var support = false;
    var version = '';

    function getVersion(d) {
        d = d.match(/[\d]+/g);
        d.length = 3;
        return d.join('.');
    }
    if (navigator.plugins && navigator.plugins.length) {
        var flash = navigator.plugins['Shockwave Flash'];
        if (flash) {
            support = true;
            if (flash.description) {
                version = getVersion(flash.description);
            }
        }

        if (navigator.plugins['Shockwave Flash 2.0']) {
            support = true;
            version = '2.0.0.11';
        }
    }
    else {
        if (navigator.mimeTypes && navigator.mimeTypes.length) {
            var mimeType = navigator.mimeTypes['application/x-shockwave-flash'];
            support = !!mimeType && mimeType.enabledPlugin;
            if (support) {
                version = getVersion(mimeType.enabledPlugin.description);
            }
        }
        else {
            try {
                var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
                support = true,
                version = getVersion(ax.GetVariable('$version'));   // eslint-disable-line
            }
            catch (e) {
                try {
                    new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
                    support = true;
                    version = '6.0.21';
                }
                catch (e) {
                    try {
                        var ax = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');    // eslint-disable-line
                        support = true;
                        version = getVersion(ax.GetVariable('$version'));   // eslint-disable-line
                    } catch (e) {   // eslint-disable-line
                        // do nothing
                    }
                }
            }
        }
    }

    return support ? version : '';
};

export default flash;
