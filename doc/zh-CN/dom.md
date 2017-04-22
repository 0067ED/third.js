## dom 模块

此模块内的函数都是DOM操作相关的函数。


### `dom/attachIntoDOM`

:::code

此函数用于把指定的DOM节点插入到DOM树中，但你不能指定它插入的位置。

> NOTE: 此函数适用于将指定节点插入到DOM树中，但是不关心其位置的情况。它可以最大程度的确保DOM节点被安全的插入到DOM树中。这在第三方脚本的场景特别适用，因为开发者其实不确定DOM树的结构，甚至不能确定页面中是否有`header`和`body`标签。
>
> 更多信息可以参考[这篇文章](http://www.stevesouders.com/blog/2010/05/11/appendchild-vs-insertbefore/)。

```javascript
var attachIntoDOM = require('S3/dom/attachIntoDOM');
console.log(attachIntoDOM(document.createElement('div')));
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| element | Element | 被插入的DOM节点 | - | - | 否 |
| context | window | 指定插入的目标节点树的window对象 | 当前JS运行环境的window对象 | - | 是 |


### `dom/getPageHeight`

:::code

此函数用于获取页面的高度。

```javascript
var getPageHeight = require('S3/dom/getPageHeight');
console.log(getPageHeight());
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | window | 指定目标页面的window对象，可以是某个iframe内的window对象 | 当前JS运行环境的window对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 页面高度 |


### `dom/getPageWidth`

:::code

此函数用于获取页面的宽度。

```javascript
var getPageWidth = require('S3/dom/getPageWidth');
console.log(getPageWidth());
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | window | 指定目标页面的window对象，可以是某个iframe内的window对象 | 当前JS运行环境的window对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 页面宽度 |


### `dom/getScrollLeft`

:::code

此函数用于获取页面可视区域左上角点的`left`值（相对于页面左上角点）。

```javascript
var getScrollLeft = require('S3/dom/getScrollLeft');
console.log(getScrollLeft());
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | window | 指定目标页面的window对象，可以是某个iframe内的window对象 | 当前JS运行环境的window对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 页面可视区域左上角点的`left`值 |


### `dom/getScrollTop`

:::code

此函数用于获取页面可视区域左上角点的`top`值（相对于页面左上角点）。

```javascript
var getScrollTop = require('S3/dom/getScrollTop');
console.log(getScrollTop());
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | window | 指定目标页面的window对象，可以是某个iframe内的window对象 | 当前JS运行环境的window对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 页面可视区域左上角点的`top`值 |


### `dom/getViewHeight`

:::code

此函数用于获取页面可视区域的高度。

```javascript
var getViewHeight = require('S3/dom/getViewHeight');
console.log(getViewHeight());
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | window | 指定目标页面的window对象，可以是某个iframe内的window对象 | 当前JS运行环境的window对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 页面可视区域的高度 |


### `dom/getViewWidth`

:::code

此函数用于获取页面可视区域的宽度。

```javascript
var getViewWidth = require('S3/dom/getViewWidth');
console.log(getViewWidth());
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| context | window | 指定目标页面的window对象，可以是某个iframe内的window对象 | 当前JS运行环境的window对象 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| number | 页面可视区域的宽度 |


### `dom/getText`

:::code

此函数用于获取指定节点内的文字，相当于`node.textContent`但做了兼容处理。

```javascript
var getText = require('S3/dom/getText');
console.log(getText(document.getElementById('text')));
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| element | Element | 指定节点 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 指定节点内的文字 |
