## lang 模块

此模块的函数都是对Javascript语言及其基本函数库的补充性功能。

### `lang/capitalize`

:::code

此函数用于修改字符串，使其除了第一个字母以外其他全部小写，第一个字母大写。

```javascript
var capitalize = require('S3/lang/capitalize');
console.log(capitalize('aPPle'));       // 'Apple'
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | string | 输入字符串 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 首字母大写的字符串 |


### `lang/escapeHTML`

:::code

此函数用于将输入字符串中的部分字符进行转义。一般用于对不可信的字符串做转移，然后在输出到DOM中，避免XSS问题。被转义的字符如下：

```
& => '&amp;
< => '&lt;
> => '&gt;
" => '&quot;
' => '&#39;
```

使用例子如下：

```javascript
var escapeHTML = require('S3/lang/escapeHTML');
document.body.innerHTML = escapeHTML('user<span>name</span>');
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | string | 输入字符串 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 转义后的字符串 |


### `lang/escapeReg`

:::code

此函数用于将输入字符串中的部分字符进行转义。一般用于对不确定的字符串做转移，然后作为正则表达式的一部分使用。

```javascript
var escapeReg = require('S3/lang/escapeReg');
new RegExp('^\\s*' + escapeReg('[a]') + '=\\s*(.*?)\\s*$', 'g')
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | string | 输入字符串 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 转义后的字符串 |


### `lang/type`

:::code

此函数用于判断输入的参数是否是字符串

```javascript
var type = require('S3/lang/type');
console.log(type(true));                    // boolean
console.log(type(1));                       // number
console.log(type('string'));                // string
console.log(type(function () {}));          // function
console.log(type([]));                      // array
console.log(type(new Date()));              // date
console.log(type(/a/));                     // regexp
console.log(type({}));                      // object
console.log(type(new Error()));             // error
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | * | 输入参数 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 输出参数是否是字符串 |


### `lang/isArray`

:::code

此函数用于判断输入的参数是否是字符串

```javascript
var isArray = require('S3/lang/isArray');
console.log(isArray([1, 2, 3]));            // true
console.log(isArray(new Array()));          // true
console.log(isArray('1, 2, 3'));            // false
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | * | 输入参数 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 输出参数是否是字符串 |


### `lang/isObject`

:::code

此函数用于判断输入的参数是否是Object类型的对象。

```javascript
var isObject = require('S3/lang/isObject');
console.log(isObject({}));                      // true
console.log(isObject(new Object()));            // true
console.log(isObject(new Array()));             // false
console.log(isObject(window));                  // false
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | * | 输入参数 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 输出参数是否是Object类型的对象 |


### `lang/isWindow`

:::code

此函数用于判断输入的参数是否是`window`对象。

> NOTE: 注意此函数只能用于判断已经挂载到页面上的`window`对象。如果是新创建的`iframe`标签，但尚未append到页面中，则此`iframe`标签内的`window`对象是不能通过此判断的。

```javascript
var isWindow = require('S3/lang/isWindow');
console.log(isWindow(window));                  // true
console.log(isWindow({}));                      // false
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | * | 输入参数 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 输出参数是否是`window`对象 |


### `lang/isNative`

:::code

此函数用于判断输入的函数是否是浏览器原生的函数，而非由用户赋值的

> NOTE: 此函数只能用于判断函数，不能用于判断是否是浏览器原生的对象，即`host object`。例如：`window.JSON`对象。

> 在IE<9之前的浏览器中，很多作为函数其实都是`host object`。对这些函数调用`isNative`方法就会出现浏览器的兼容性问题。例如：`window.setTimeout`。

```javascript
var isNative = require('S3/lang/isNative');
console.log(isNative(window.encodeURIComponent));       // true
window.encodeURIComponent = function () {};
console.log(isNative(window.encodeURIComponent));       // false
console.log(isNative(JSON));                            // false
console.log(isNative(JSON.stringify));                  // true
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | * | 输入参数 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 是否是浏览器原生的函数 |


### `lang/random`

:::code

此函数用于生成一个随机数。

```javascript
var random = require('S3/lang/random');
console.log(random());
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 随机数 |


### `lang/randomId`

:::code

此函数用于生成一个随机的字符串。这个id是`random`函数随机生成的数字转换成36进制后的字符串。

```javascript
var randomId = require('S3/lang/randomId');
console.log(randomId());
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 随机的字符串 |


### `lang/uuid`

:::code

此函数用于生成一个随机的ID。ID由四组随机字符串通过连接符串起来的

```javascript
var uuid = require('S3/lang/uuid');
console.log(uuid());
console.log(uuid('_'));
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| join | string | 连接符 | '.' | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 随机的ID |


### `lang/toArray`

:::code

此函数用于将近似数组的对象转换成真正的数组，一般用于处理函数参数、`NodeList`等等。

```javascript
var toArray = require('S3/lang/toArray');
console.log(toArray(document.getElementsByTagName('p')));
console.log(toArray(arguments));
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| input | Object | 近似数组的对象 | - | - | 否 |
| start | number | 新数组由旧对象的那一项（包含）开始获取，从0开始，支持负数 | 0 | - | 是 |
| end   | number | 新数组由旧对象的那一项（不包含）结束获取 | 到结尾，即`input.length`值 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Array | 生成后的数组 |
