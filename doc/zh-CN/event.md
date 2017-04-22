## event 模块

此模块内的函数都是DOM事件操作相关的函数。


### `event/domReady`

:::code

此函数用于绑定`document ready`事件。

```javascript
var domReady = require('S3/event/domReady');
function readyCallback() {
    // TODO
}
domReady(readyCallback, window);
domReady(readyCallback, document.getElementById('iframe').contentWindow);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| Function | callback | 回调函数 | - | - | 否 |
| context | window | 指定的window对象 | 当前JS运行环境的window对象 | - | 是 |


### `event/on`

:::code

此函数用于绑定DOM事件。

```javascript
var on = require('S3/event/on');
on(document.body, 'click', function (e) {});
on(window, 'load', function (e) {});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| element | Element\|Window | 绑定事件的节点或window对象 | - | - | 否 |
| event | string | 事件名 | - | - | 否 |
| function(Event) | callback | 回调函数 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element\|Window | 被绑定的节点或window对象 |


### `event/off`

:::code

此函数用于取消DOM事件的绑定。

```javascript
var off = require('S3/event/off');
function callback(e) {
    // TODO
}
off(document.body, 'click', callback);
off(window, 'load');
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| element | Element\|Window | 需要被解绑的节点或window对象 | - | - | 否 |
| event | string | 事件名 | - | - | 否 |
| function(Event)= | callback | 回调函数 | 取消所有绑定的回调函数 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element\|Window | 解绑的节点或window对象 |


### `event/preventDefault`

:::code

此函数用于阻止浏览器事件的默认行为，它兼容旧版本的IE（>=6）。

```javascript
var on = require('S3/event/on');
var preventDefault = require('S3/event/preventDefault');
function callback(e) {
    preventDefault(e);
}
on(document.body, 'click', callback);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| event | Event | 事件对象 | - | - | 否 |


### `event/stopPropagation`

:::code

此函数用于阻止浏览器事件的继续传播，它兼容旧版本的IE（>=6）。

```javascript
var on = require('S3/event/on');
var stopPropagation = require('S3/event/stopPropagation');
function callback(e) {
    stopPropagation(e);
}
on(document.body, 'click', callback);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| event | Event | 事件对象 | - | - | 否 |


### `event/getTarget`

:::code

此函数用于获取事件对象的目标节点，即`target`值（此方法对旧版本的IE做了fallback处理）。

```javascript
var on = require('S3/event/on');
var getTarget = require('S3/event/getTarget');
function callback(e) {
    console.log(getTarget(e));          // body
}
on(document.body, 'click', callback);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| event | Event | 事件对象 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 事件对象的目标节点，即`target`值 |


### `event/getKeyCode`

:::code

此函数用于获取键盘事件的按键值。

```javascript
var on = require('S3/event/on');
var getKeyCode = require('S3/event/getKeyCode');
function callback(e) {
    console.log(getKeyCode(e));          // 20
}
on(document.body, 'keyup', callback);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| event | Event | 事件对象 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 键盘事件的按键值 |


### `event/getPageX`

:::code

此函数用于获取鼠标事件的点击位置距离页面左上角的水平距离。如果只想获取距离可视区域左上角的距离，则直接用`event.clientX`。

```javascript
var on = require('S3/event/on');
var getPageX = require('S3/event/getPageX');
function callback(e) {
    console.log(getPageX(e));          // 20
    console.log(e.clientX);            // 20
}
on(document.body, 'click', callback);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| event | Event | 事件对象 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 鼠标事件的点击位置距离页面左上角的水平距离 |


### `event/getPageY`

:::code

此函数用于获取鼠标事件的点击位置距离页面左上角的垂直距离。如果只想获取距离可视区域左上角的距离，则直接用`event.clientX`。

```javascript
var on = require('S3/event/on');
var getPageY = require('S3/event/getPageY');
function callback(e) {
    console.log(getPageY(e));          // 200
    console.log(e.clientY);            // 20
}
on(document.body, 'click', callback);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| event | Event | 事件对象 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 鼠标事件的点击位置距离页面左上角的垂直距离 |
