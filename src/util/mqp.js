import toArray from '../lang/toArray';
import isWindow from '../lang/isWindow';

/**
 * The Method Queue Pattern
 * http://www.lognormal.com/blog/2012/12/12/the-script-loader-pattern/
 *
 *      // Your Code
 *      var ExportApi = {
 *          ready(callback) {
 *              // execute callback
 *          },
 *          send(data) {
 *              // do something with data
 *          }
 *      };
 *      mqp('__mq', ExportApi);
 *
 *      // Your users's Code
 *      <script src="exportApi.js" async></script>
 *      <script>
 *          __mq = __mq || [];
 *          __mq.push(['send', data]);
 *          __mq.push(function () {
 *              // exportApi loaded
 *          });
 *      </script>
 *
 * @param {string} targetName name on Window
 * @param {Object} proxy proxy object
 * @param {Window|Object=} opts window object or options
 * @param {Window=} opts.context window object
 * @param {function(Object, string, Object):Function=} opts.callback
 *                                  setup your own caller.
 *                                  callback(proxy, method, params) {
 *                                      proxy[method](...params);
 *                                  }
 * @param {string=} opts.ready The function name of proxy to execute ready callback.
 *                             Default is `ready`.
 */
var mqp = function (targetName, proxy, opts) {
    var optsIsWindowOrUndefined = !opts || isWindow(opts);
    context = (optsIsWindowOrUndefined ? opts : opts.context) || window;
    context[targetName] = context[targetName] || [];
    methodCaller = optsIsWindowOrUndefined ? null : opts.callback;
    readyFuncName = (optsIsWindowOrUndefined ? null : opts.ready) || 'ready';

    var target = context[targetName];
    var call = function (params) {
        if (!params.shift) {
            if (typeof params === 'function') {
                // is function
                params = [params];
            }
            else {
                // is arguments
                params = toArray(params);
            }
        }
        // remove the method from the first item
        var method = params.shift();
        if (typeof method === 'string') {
            if (methodCaller) {
                methodCaller(proxy, method, params);
            }
            else {
                proxy[method].apply(proxy, params);
            }
        }
        else {
            proxy[readyFuncName](method);
        }
    };

    while (target.length) {
        // remove the first item from the queue
        call(target.shift());
    }

    target.push = call;
};

export default mqp;
