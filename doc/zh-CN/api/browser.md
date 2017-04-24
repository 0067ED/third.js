## browser 模块

此模块的函数主要用于浏览器UA的判断。目前只提供了少量浏览器的UA判断，后续会增加。

> NOTE: 除非遇到不可抗力，否则尽量不要使用UA判断，转而使用特征判断（详见`detect`模块）

### `browser/android`

:::code

字符串类型，表示当前安卓的版本号

```javascript
var android = require('third/browser/android');
console.log('安卓版本：' + (android || '非安卓浏览器'));
```
:::


### `browser/ie`

:::code

字符串类型，表示当前IE浏览器的版本号

```javascript
var android = require('third/browser/ie');
console.log('IE浏览器的版本号：' + (ie || '非IE浏览器'));
```
:::


### `browser/isChrome`

:::code

布尔值类型，表示是否是chrome浏览器

```javascript
var isChrome = require('third/browser/isChrome');
console.log('是否是chrome浏览器：' + (isChrome || '非chrome浏览器'));
```
:::
