/**
 * 标志位记录的类，可以将很多标志位压缩成很短的字符串，以此来减少传输量
 * 此方法来自Google的analytics.js
 * @param {Array.<boolean>} data 初始标志位
 */
var Flags = function (data) {
    this._data = data || [];
};

/**
 * 开启指定的标志位
 * @param {number} index 标志位，只能是数字
 */
Flags.prototype.on = function (index) {
    this._data[index] = true;
};

/**
 * 关闭指定的标志位
 * @param {number} index 标志位，只能是数字
 */
Flags.prototype.off = function (index) {
    this._data[index] = false;
};

/**
 * 合并两个Flags(或操作)，返回一个新的
 * @param {Flags} flags Flags实例
 * @return {Flags} 返回一个新的Flags实例
 */
Flags.prototype.merge = function (flags) {
    var copy = this._data.slice();
    var newData = flags._data;
    for (var i = 0; i < newData.length; i++) {
        copy[i] = copy[i] || newData[i];
    }
    return new Flags(copy);
};

/**
 * 编码压缩成字符串并返回
 * @return {string}
 */
Flags.prototype.encode = function () {
    var arr = [];
    for (var i = 0; i < this._data.length; i++) {
        if (this._data[i]) {
            // `1 << x` === `Math.pow(2, x)`
            arr[Math.floor(i / 6)] ^= 1 << (i % 6);
        }
    }
    for (i = 0; i < arr.length; i++) {
        arr[i] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.charAt(arr[i] || 0);
    }
    return arr.join('') + '~';
};

export default Flags;
