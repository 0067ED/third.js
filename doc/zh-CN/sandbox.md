## sandbox模块

此模块内的函数都是沙盒相关的工具类函数，它们基本都使用了iframe模块下的函数。


### `sandbox/create`

:::code

此函数用于创建沙盒，沙盒的本质是一个空的、隐藏的、非跨域iframe节点。

```javascript
var create = require('third/sandbox/create');
window.encodeURIComponent = 'test';
create(function (win) {
    console.log(win.encodeURIComponent !== 'test'); // true
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| callback | function(Window) | - | - | 否 |
| context  | Window= | 在指定的window对象中创建iframe节点 | 默认为当前JS的运行环境 | - | 是

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 新创建的`iframe`DOM节点 |


### `sandbox/global`

:::code

此函数用于创建一个全局的沙盒，并且可以通过它获取此沙盒。尚未创建全局沙盒之前，函数默认返回的是JS当前执行环境的window对象。当函数传入一个回调函数时，会开始创建次全局沙盒实例。由于创建沙盒是异步的，故必须通过回调函数异步的获取沙盒实例。沙盒创建完成之后执行`global()`便可以同步的获取沙盒实例。

> NOTE: Third工具库内基本所有涉及到native API调用的函数，都会使用`global()`函数来获取或调用native的API函数。这是为了避免浏览器的提供的native API被网页开发者重写。

```javascript
var global = require('third/sandbox/global');
window.encodeURIComponent = 'test';
// 未创建时
console.log(global() === window);   // true
// 开始创建
global(function (win) {
    // 创建完成
    console.log(global() === win);                  // true
    console.log(win.encodeURIComponent !== 'test'); // true
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| callback | function(Window)= | 全局沙盒创建成功之后的回调函数，参数为沙盒实例 | - | - | 否 |
| context  | Window= | 在指定的window对象中创建沙盒相关的iframe节点 | 默认为当前JS的运行环境 | - | 是

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Window | 当输入不包含回调函数时，会返回全局的沙盒实例，或者context |


### `sandbox/eval`

:::code

此函数用于创建沙盒，并在沙盒内部执行指定的JS。

```javascript
var eval = require('third/sandbox/eval');
eval('window.test = 1;', function (win) {
    console.log(win.test);      // 1
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| js    | string\|Function | JS字符串，或者是JS函数（不会保留JS的执行上下文） | - | - | 否 |
| callback | function(Window, Document) | 执行完JS之后的回调函数 | - | - | 否 |
| charset  | string= | 指定JS文件的编码 | 'utf-8' | - | 是

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 新创建的`iframe`DOM节点 |


### `sandbox/load`

:::code

此函数用于创建沙盒，并在沙盒内部加载并执行指定的远程JS文件（单个或多个）。

```javascript
var load = require('third/sandbox/load');
load('http://example.com/script.js', function (win, doc) {
    console.log(win.test);      // 1
});
load(
    [
        'http://example.com/script2.js',
        'http://example.com/script1.js'
    ],
    function (win, doc) {
        console.log(win.test);      // 1
    },
    'GBK'
);
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| js    | string\|Function | JS字符串，或者是JS函数（不会保留JS的执行上下文） | - | - | 否 |
| callback | function(Window, Document) | 执行完JS之后的回调函数 | - | - | 否 |
| charset  | string= | 指定JS文件的编码 | 'utf-8' | - | 是

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 新创建的`iframe`DOM节点 |
