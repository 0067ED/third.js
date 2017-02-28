// Used to detect native function like `window.encodeURIComponent` is be rewrited or not.
// Borrow from jdalton (author of lodash)
// https://gist.github.com/jdalton/5e34d890105aca44399f


// I recently saw http://davidwalsh.name/detect-native-function tweeted by
// @elijahmanor and was pretty jazzed about it. One of my favorite JS tricks is
// detecting native methods. Detecting native methods is handy because third
// party code can shim methods incorrectly as seen in past versions of
// Prototype.js, es5-shim, & modernizr, which can cause your code to behave in
// unexpected ways. This isn't a knock against those projects, shimming is really
// really hard to get right. Shimmed methods may also lack the performance
// benefits of their native counterparts. Lo-Dash, Dojo, Ember, & YUI,
// to name a few, detect native methods to avoid shims and rely on their own
// fallback paths, trusting their code over third-party.
//
// The technique, described in the blog post and used by most, is to use a regexp
// to detect `[native code]` from the function's string representation. This is
// a good start however it has some issues. This technique falls down when native
// method string representations don't contain `[native code]`. Granted nowadays
// most engines have standardized on `[native code]` but it is still non-spec'ed
// behavior. Another issue is that simply coercing a function to a string can be
// tricked by the function's `toString` method. So with those issues in mind lets
// examine how Lo-Dash detects native methods. The code below has been adapted
// from Lo-Dash's source.

// Used to resolve the internal `[[Class]]` of values.
var toString = Object.prototype.toString;

// Used to resolve the decompiled source of functions.
var fnToString = Function.prototype.toString;

// Used to detect host constructors (Safari > 4; really typed array specific).
var reHostCtor = /^\[object .+?Constructor\]$/;

// Compile a regexp using a common native method as a template.
// We chose `Object#toString` because there's a good chance it is not being mucked with.
var reNative = RegExp('^'
    // Coerce `Object#toString` to a string.
    + String(toString)
        // Escape any special regexp characters.
        .replace(/[.*+?^${}()|[\]\/\\]/g, '\\$&')
        // Replace mentions of `toString` with `.*?` to keep the template generic.
        // Replace thing like `for ...` to support environments, like Rhino, which add extra
        // info such as method arity.
        .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?')
    + '$'
);

/**
 * Used to detect native function like `window.encodeURIComponent` is be rewrited or not.
 * Borrow from jdalton (author of lodash)
 * https://gist.github.com/jdalton/5e34d890105aca44399f
 * Not support IE<9 host object like `window.setTimeout`
 * @param {Function} value input value to be detected.
 * @return {boolean} is native function or not.
 */
export default function (value) {
    var type = typeof value;
    return type === 'function'
        // Use `Function#toString` to bypass the value's own `toString` method
        // and avoid being faked out.
        ? reNative.test(fnToString.call(value))
        // Fallback to a host object check because some environments will represent
        // things like typed arrays as DOM methods which may not conform to the
        // normal native pattern.
        : (value && type === 'object' && reHostCtor.test(toString.call(value))) || false;
};
