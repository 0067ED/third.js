/**
 * 解码Flags类编码结果的函数
 * 是mmzhou所写，非GA源码
 * @param {string} str 编码后的字符串
 * @return {Array.<number>} 解码后的数组，可以调用new Flags(result)来生成Flags实例
 */
var decode = function (str) {
    str = str.slice(0, -1);
    var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    var code;
    var binaryCode;
    var reversedbinaryCode;
    var codes = [];
    for (var i = 0; i < str.length; i++) {
        code = key.indexOf(str.charAt(i));
        binaryCode = code.toString(2);
        reversedbinaryCode = binaryCode.split('').reverse();
        // console.log(i + '=' + code + '=' + binaryCode + '=reverse(' + reversedbinaryCode + ')');
        for (var j = 0; j < reversedbinaryCode.length; j++) {
            if (reversedbinaryCode[j] === '1') {
                codes.push(j + 6 * i);
            }
        }
    }
    return codes;
};

export default decode;
