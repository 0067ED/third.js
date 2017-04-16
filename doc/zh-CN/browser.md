## browser 模块


### `browser/android`

:::code

字符串类型，表示当前安卓的版本号

```javascript
var android = require('S3/browser/android');
console.log('安卓版本：' + (android || '非安卓浏览器'));
```
:::


### `browser/ie`

:::code

字符串类型，表示当前IE浏览器的版本号

```javascript
var android = require('S3/browser/ie');
console.log('IE浏览器的版本号：' + (ie || '非IE浏览器'));
```
:::


### `browser/isChrome`

:::code

布尔值类型，表示是否是chrome浏览器

```javascript
var isChrome = require('S3/browser/isChrome');
console.log('是否是chrome浏览器：' + (isChrome || '非chrome浏览器'));
```
:::
