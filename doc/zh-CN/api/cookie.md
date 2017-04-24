## cookie 模块

此模块内的函数都是cookie操作相关的函数。


### `cookie/set`

:::code

此函数用于设置指定名字的cookie值。

> NOTE: 此函数需要与`cookie/get`配套使用。因为为了区分设置在不同域名、不同路径下的同名cookie，`set`函数在设置cookie时加入了一些额外标志位。如果直接通过`document.cookie`获取的值就会包含这些额外标志位。

```javascript
var set = require('third/cookie/set');
set('key', 'value');
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| key | string | cookie的名字 | - | - | 否 |
| value | string\|number | cookie的值 | - | - | 否 |
| options | Object= | 可选配置 | - | - | 否 |
| options.context | Window= | 指定需要设置cookie的window对象 | 默认为当前JS执行环境的window对象 | - | 否 |
| options.expires | number= | 指定cookie多长时间后过期（微秒） | - | - | 否 |
| options.domain  | string= | 指定设置cookie的域名 | - | - | 否 |
| options.path    | string= | 指定设置cookie的路径 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 设置成功与否 |



### `cookie/get`

:::code

此函数用于获取指定名字的cookie值。

> NOTE: 此函数需要与`cookie/set`配套使用。因为为了区分设置在不同域名、不同路径下的同名cookie，`set`函数在设置cookie时加入了一些额外标志位，`get`函数则会自动删掉这些标志位。如果用`get`函数去获取普通的cookie（非`set`函数设置）则容易出现bug。

```javascript
var set = require('third/cookie/set');
var get = require('third/cookie/get');
set('key', 'value');
console.log(get('key') === 'value');        // true
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| key | string | cookie的名字 | - | - | 否 |
| options | Object= | 可选配置 | - | - | 否 |
| options.context | Window= | 指定需要设置cookie的window对象 | 默认为当前JS执行环境的window对象 | - | 否 |
| options.domain  | string= | 指定设置cookie的域名 | - | - | 否 |
| options.path    | string= | 指定设置cookie的路径 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 对应名字的cookie值 |



### `cookie/remove`

:::code

此函数用于删除指定名字的。

```javascript
var set = require('third/cookie/set');
var get = require('third/cookie/get');
var remove = require('third/cookie/remove');
set('key', 'value');
remove('key');
console.log(get('key') === 'value');        // false
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| key | string | cookie的名字 | - | - | 否 |
| options | Object= | 可选配置 | - | - | 否 |
| options.context | Window= | 指定需要设置cookie的window对象 | 默认为当前JS执行环境的window对象 | - | 否 |
| options.domain  | string= | 指定设置cookie的域名 | - | - | 否 |
| options.path    | string= | 指定设置cookie的路径 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 删除成功与否 |



### `cookie/setRaw`

:::code

此函数用于设置指定名字的cookie值，这里设置的是原始值。

> NOTE: 此函数与`cookie/set`不同点在于，`setRaw`设置的是原始值，不会修改或添加任何标志位。

```javascript
var setRaw = require('third/cookie/setRaw');
setRaw('key', 'value');
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| key | string | cookie的名字 | - | - | 否 |
| value | string\|number | cookie的值 | - | - | 否 |
| options | Object= | 可选配置 | - | - | 否 |
| options.context | Window= | 指定需要设置cookie的window对象 | 默认为当前JS执行环境的window对象 | - | 否 |
| options.expires | number= | 指定cookie多长时间后过期（微秒） | - | - | 否 |
| options.domain  | string= | 指定设置cookie的域名 | - | - | 否 |
| options.path    | string= | 指定设置cookie的路径 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 设置成功与否 |



### `cookie/getRaw`

:::code

此函数用于获取指定名字的cookie原始值。

> NOTE: 此函数与`cookie/get`不同点在于：`getRaw`获取的是原始值，不会判断cookie值来自哪个域名或路径。所以`getRaw`得到的返回值是数组类型的。

```javascript
// 当前页面的路径是 /doc/
var setRaw = require('third/cookie/setRaw');
var getRaw = require('third/cookie/getRaw');
setRaw('key', 'value', {
    path: '/doc/test2'
});
setRaw('key', 'value2', {
    path: '/doc/test1'
});
console.log(getRaw('key')[0] === 'value');        // true
console.log(getRaw('key')[1] === 'value2');       // true
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| key | string | cookie的名字 | - | - | 否 |
| options | Object= | 可选配置 | - | - | 否 |
| options.context | Window= | 指定需要设置cookie的window对象 | 默认为当前JS执行环境的window对象 | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Array.<string> | 对应名字的cookie值，可能是多个 |



### `cookie/setRootRaw`

:::code

此函数用于设置指定名字的cookie值，并且自动设置到当前页面的根域名+根路径（`/`）下。

```javascript
var setRootRaw = require('third/cookie/setRootRaw');
setRootRaw('key', 'value');
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| key | string | cookie的名字 | - | - | 否 |
| value | string\|number | cookie的值 | - | - | 否 |
| options | Object= | 可选配置 | - | - | 否 |
| options.context | Window= | 指定需要设置cookie的window对象 | 默认为当前JS执行环境的window对象 | - | 否 |
| options.expires | number= | 指定cookie多长时间后过期（微秒） | - | - | 否 |
| options.extraBlackList  | Array.<string>= | 指定设置cookie的域名 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 如果设置成功则返回根域名，否则返回空字符串 |
