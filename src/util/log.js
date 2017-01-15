var callConsole = function (funcName) {
    return function () {
        var con = window.console;
        if (typeof con !== 'undefined' && typeof con[funcName] === 'function') {
            con[funcName].apply(con, arguments);
        }
    };
};

var log = callConsole('log');
log.group = callConsole('group');
log.groupEnd = callConsole('groupEnd');

export default log;
