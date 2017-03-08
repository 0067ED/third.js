// Modified from Jonathan Marzullo's answer.
// http://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome

// please note,
// that IE11 now returns undefined again for window.chrome
// and new Opera 30 outputs true for window.chrome
// and new IE Edge outputs to true now for window.chrome
// and if not iOS Chrome check
var winNav = window.navigator;
var ua = winNav.userAgent;
// is Google Chrome on IOS
// var isIOSChrome = winNav.userAgent.match('CriOS');

export default (window.chrome != null)
        && (winNav.vendor === 'Google Inc.')
        && /Chrome/.test(ua)
        // not new Opera >= 30
        && (ua.indexOf('OPR') === -1)
        // not IE Edge
        && (ua.indexOf('Edge') === -1);
