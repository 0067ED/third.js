## iframe模块

此模块内的函数都是`iframe`标签相关的函数。在第三方JS SDK的开发中`iframe`标签有非常强大的作用。它可以被用来展示不可信的第三方内容（同源策略）；可以被用来创建一个沙盒，避免SDK代码与页面原有代码冲突；甚至可以被用来加载JS文件（不会block load事件）。所以我们单独抽出了一个iframe模块来存放相关方法。


### `iframe/createAnonymous`

:::code

创建一个隐藏的`iframe`标签，它对普通用户来说是不可见的，并且宽高为0。

> NOTE: 新创建的`iframe`节点并没有被插入到页面中去，而且在IE下直接获取其`contentWindow`可能会出错。此方法一般需要和`dom/attachIntoDOM`和`iframe/ready`或者`iframe/write`函数一起使用。

```javascript
var createAnonymous = require('S3/iframe/createAnonymous');
var write = require('S3/iframe/write');
var attachIntoDOM = require('S3/dom/attachIntoDOM');
var iframe = createAnonymous();
attachIntoDOM(iframe);
write(iframe, '<div>IMPORTANT MESSAGE!</div>', function () {});
```
:::

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 新创建的`iframe`DOM节点 |


### `iframe/ready`

:::code

此函数用于获取iframe（非跨域，必须已经在dom树中）节点内部的window和document对象。

> NOTE: 在IE浏览器下，如果当前页面修改过`document.domain`，那么即使是同域名的iframe节点，直接通过`contentWindow`获取其window对象，也会报跨域的错误。为了解决这个问题，需要同时再设置iframe节点内的`document.domain`为相同值。故这个方法并不是同步的，而是异步的。

```javascript
var createAnonymous = require('S3/iframe/createAnonymous');
var ready = require('S3/iframe/ready');
var attachIntoDOM = require('S3/dom/attachIntoDOM');
var iframe = createAnonymous();
attachIntoDOM(iframe);
ready(iframe, function (win, doc) {
    // TODO
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| element  | Element | iframe节点，必须已经在dom树中 | - | - | 否 |
| callback | function(Window, Document, string) | 成功获取window和document对象后的回调函数。第三个参数为修改后的`document.origin`值，如果没有修改则为空字符串 | - | - | 否 |


### `iframe/write`

:::code

此函数用于修改iframe（非跨域，必须已经在dom树中）节点内部的HTML。

```javascript
var createAnonymous = require('S3/iframe/createAnonymous');
var write = require('S3/iframe/write');
var attachIntoDOM = require('S3/dom/attachIntoDOM');
var iframe = createAnonymous();
attachIntoDOM(iframe);
write(iframe, '<div>IMPORTANT MESSAGE!</div>', function (win, doc) {
    // TODO
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| element  | Element | iframe节点，必须已经在dom树中 | - | - | 否 |
| html     | string  | HTML字符串 | - | - | 否 |
| callback | function(Window, Document)= | 创建并加载完成之后的回调函数 | - | - | 否 |


### `iframe/createByHTML`

:::code

此函数用于根据指定的HTML字符串创建一个隐藏的iframe（非跨域）节点，iframe节点会被自动插入到DOM树中（位置不确定）。

```javascript
var createByHTML = require('S3/iframe/createByHTML');
var iframe = createByHTML('<div>IMPORTANT MESSAGE!</div>', function (win, doc) {
    // TODO
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| html     | string  | HTML字符串 | - | - | 否 |
| callback | function(Window, Document)= | 创建并加载完成之后的回调函数 | - | - | 否 |
| context  | Window= | 在指定的window对象中创建iframe节点 | 默认为当前JS的运行环境 | - | 是

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 新创建的`iframe`DOM节点 |


### `iframe/createBySrc`

:::code

此函数用于根据指定的页面地址创建一个隐藏的iframe（可能会跨域）节点，iframe节点会被自动插入到DOM树中（位置不确定）。

```javascript
var createBySrc = require('S3/iframe/createBySrc');
var iframe = createBySrc('http://example.com/iframe.html');
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| html     | string  | HTML字符串 | - | - | 否 |
| context  | Window= | 在指定的window对象中创建iframe节点 | 默认为当前JS的运行环境 | - | 是

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 新创建的`iframe`DOM节点 |
