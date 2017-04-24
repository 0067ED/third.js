## detect 模块

此模块是特征检测模块。


### `detect/adBlock`

:::code

此函数用于判断当前浏览器是否使用adBlock插件来屏蔽广告。

```javascript
var adBlock = require('third/detect/adBlock');
console.log(adBlock());
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前浏览器是否使用adBlock插件来屏蔽广告 |


### `detect/cookie`

:::code

此函数用于判断浏览器是否支持cookie。

```javascript
var cookie = require('third/detect/cookie');
console.log(cookie());
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前浏览器是否支持cookie |


### `detect/cors`

:::code

此函数用于判断浏览器是否支持跨域的请求。如果支持就会返回'xhr'或'xdr'，否则返回空字符串。

1. `xhr`表示浏览器支持`XMLHttpRequest`对象的跨域
2. `xdr`只会出现在IE9和IE8中，它们可以通过`XDomainRequest`对象来实现跨域请求

```javascript
var cors = require('third/detect/cors');
console.log(cors());
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 当前浏览器是否支持跨域的请求，如果支持就会返回'xhr'或'xdr'，否则返回空字符串 |



### `detect/flash`

:::code

此函数用于检测当前浏览器的flash插件的版本号。

```javascript
var flash = require('third/detect/flash');
console.log(flash());       // '25.0.0'
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 当前浏览器的flash插件的版本号 |


### `detect/inFrame`

:::code

此函数用于判断当前JS的运行环境是否是在`frame`或`iframe`标签中。

```javascript
var inFrame = require('third/detect/inFrame');
console.log(inFrame());       // '25.0.0'
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前JS的运行环境是否是在`frame`或`iframe`标签中 |


### `detect/isPrerender`

:::code

此函数用于判断当前JS的运行环境是否是在预渲染过程中。

```javascript
var isPrerender = require('third/detect/isPrerender');
console.log(isPrerender());                             // true
console.log(isPrerender(iframe.contentWindow));         // false
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | Window | JS的运行环境 | 当前的`window`对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前JS的运行环境是否是在预渲染过程中 |


### `detect/isPreviewLoad`

:::code

此函数用于判断当前JS的运行环境是否是在预览界面的渲染流程中。Safari浏览器有个Top site功能，它会展示最长访问的几个页面的截图。示例如下：

![](https://cloud.githubusercontent.com/assets/249872/18608514/e796690e-7d1d-11e6-9206-7fd3aa2c0ee8.png)

Safari会去真正的加载解析这几个站点页面，然后截图并保存。而当用户点开这些站点时则会再次重新加载解析这些页面。`isPreviewLoad`函数则是用来判断当前的JS运行环境是否是在这个预览界面的截图流程中。

```javascript
var isPreviewLoad = require('third/detect/isPreviewLoad');
console.log(isPrerender());                             // true
console.log(isPrerender(iframe.contentWindow));         // false
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | Window | JS的运行环境 | 当前的`window`对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前JS的运行环境是否是在预览界面的渲染流程中 |


### `detect/localStorage`

:::code

此函数用于判断当前浏览器是否支持`localStorage`

```javascript
var localStorage = require('third/detect/localStorage');
console.log(localStorage());                             // true
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前浏览器是否支持`localStorage` |


### `detect/sessionStorage`

:::code

此函数用于判断当前浏览器是否支持`sessionStorage`

```javascript
var sessionStorage = require('third/detect/sessionStorage');
console.log(sessionStorage());                             // true
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前浏览器是否支持`sessionStorage` |


### `detect/postMessage`

:::code

此函数用于判断当前浏览器是否支持`postMessage`

```javascript
var postMessage = require('third/detect/postMessage');
console.log(postMessage());                             // true
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前浏览器是否支持`postMessage` |


### `detect/sendBeacon`

:::code

此函数用于判断当前浏览器是否支持`sendBeacon`

```javascript
var sendBeacon = require('third/detect/sendBeacon');
console.log(sendBeacon());                             // true
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前浏览器是否支持`sendBeacon` |


### `detect/touchEvents`

:::code

此函数用于判断当前浏览器是否支持`touch`事件

```javascript
var touchEvents = require('third/detect/touchEvents');
console.log(touchEvents());                             // true
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 当前浏览器是否支持`touch`事件 |
