## json 模块

此模块的函数都是JSON相关的操作，是对原生对象`window.JSON`的polyfill。

### `json/parse`

:::code

此函数用于把字符串解析成JSON对象。如果浏览器支持原生的`window.JSON`，则会优先使用原生的方法。

```javascript
var parse = require('S3/json/parse');
console.log(parse('{"a": 1}').a);       // 1
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | string | 输入的字符串 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Object\|Array | 解析之后的JSON对象 |
