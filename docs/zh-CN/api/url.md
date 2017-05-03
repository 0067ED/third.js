## url 模块

此模块的函数主要用于URL的解析和生成。

### `url/parse`

:::code

此函数用于解析URL地址。

```javascript
var parse = require('third/url/parse');
var url = parse('http://example.com:8000/books/12?type=music#hash');
console.log(url.protocol);      // 'http:'
console.log(url.origin);        // 'http://example.com:8000'
console.log(url.host);          // 'example.com:8000'
console.log(url.hostname);      // 'example.com'
console.log(url.port);          // '8000'
console.log(url.pathname);      // '/books/12'
console.log(url.search);        // '?type=music'
console.log(url.href);          // 'http://example.com:8000/books/12?type=music#hash'
console.log(url.hash);          // '#hash'

var url2 = parse('http://example.com/');
console.log(url2.origin);       // 'http://example.com'
console.log(url2.host);         // example.com
console.log(url2.hostname);     // example.com
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | URL地址，可以是相对地址（相对于`relativedUrl`）也可以是绝对地址。 | - | - | 否 |
| relativedUrl | string= | URL的相对地址 | 默认是当前浏览器地址 | - | 是 |

#### 返回值

| 类型 | 参数 | 描述 |
| ---- | --- |---- |
| Object | parsedUrl | 解析之后的URL地址 |
| string | parsedUrl.href | 全部地址 |
| string | parsedUrl.hash | hash参数 |
| string | parsedUrl.protocol | 协议 |
| string | parsedUrl.search | 参数 |
| string | parsedUrl.pathname | 路径 |
| string | parsedUrl.port | 端口号 |
| string | parsedUrl.hostname | 域名 |
| string | parsedUrl.host | `域名 + 端口`，如果端口号是对应协议的默认端口号则没有 |
| string | parsedUrl.origin | `协议 + '//' + 域名 + 端口`，如果端口号是对应协议的默认端口号则没有 |


### `url/getQuery`

:::code

此函数用于获取指定URL上指定参数名的搜索参数值。

```javascript
var getQuery = require('third/url/getQuery');
var types = getQuery('?type=1&type=2#type=3', 'type');
console.log(types);             // ['1', '2']

var team = getQuery('?team=%230067ED#type=3', 'team');
console.log(team);              // '#0067ED'

var noname = getQuery('?team=%230067ED#type=3', 'noname');
console.log(noname);            // ''
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | 包含搜索参数的URL地址 | - | - | 否 |
| key | string | 参数名 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string\|Arrayy.<string> | 搜索参数值，如果有多个则以数组形式返回，如果不存在则返回空字符串 |


### `url/getQuerys`

:::code

此函数用于获取指定URL上的所有搜索参数值。

```javascript
var getQuerys = require('third/url/getQuerys');
var querys = getQuerys('?team=%230067ED&type=1&type=2#type=3');
console.log(querys.team);             // '#0067ED'
console.log(querys.type);             // ['1', '2']
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | 包含搜索参数的URL地址 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Object.<string, string|Array.<string>> | 所有搜索参数值，以对象形式返回 |


### `url/getFirstQuery`

:::code

此函数用于获取指定URL上的所有搜索参数值。

```javascript
var getFirstQuery = require('third/url/getFirstQuery');
var firstType = getFirstQuery('?team=%230067ED&type=1&type=2#type=3', 'type');
console.log(firstType);             // '1'
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | 包含搜索参数的URL地址 | - | - | 否 |
| key | string | 参数名 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 第一个找到的指定参数名的搜索参数值，如果不存在则返回空字符串 |


### `url/hasQuery`

:::code

此函数用于判断指定URL上是否包含了指定参数名的参数。

```javascript
var hasQuery = require('third/url/hasQuery');
console.log(hasQuery('?team=%230067ED&type=1&type=2', 'type'));      // true
console.log(hasQuery('?team=&type=1&type=2#type=3', 'team'));        // true
console.log(hasQuery('?type=1&type=2#type=3', 'team'));              // false
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | 包含搜索参数的URL地址 | - | - | 否 |
| key | string | 参数名 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 第一个找到的指定参数名的搜索参数值 |


### `url/setQuery`

:::code

此函数用于更新指定URL上的指定参数名的参数值。

```javascript
var setQuery = require('third/url/setQuery');
var updatedUrl = setQuery('?team=%230067ED&type=1&type=2', 'type', 3);
console.log(updatedUrl);        // '?team=%230067ED&type=3'
updatedUrl = setQuery('?team=%230067ED&type=1&type=2', 'type', [3, 4]);
console.log(updatedUrl);        // '?team=%230067ED&type=3&type=4'
updatedUrl = setQuery('?team=%230067ED&type=1&type=2', 'type', '');
console.log(updatedUrl);        // '?team=%230067ED&type='
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | URL地址 | - | - | 否 |
| key | string | 参数名 | - | - | 否 |
| value | string\|Arrayy.<string> | 搜索参数值，如果有多个则以数组提供 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 更新后的URL地址 |


### `url/deleteQuery`

:::code

此函数用于删除指定URL上的指定参数名的参数。

```javascript
var deleteQuery = require('third/url/deleteQuery');
var updatedUrl = deleteQuery('?team=%230067ED&type=1&type=2', 'type');
console.log(updatedUrl);        // '?team=%230067ED&type=3'
updatedUrl = deleteQuery('?type=1&type=2', 'type');
console.log(updatedUrl);        // ''
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | URL地址 | - | - | 否 |
| key | string | 参数名 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 更新后的URL地址 |


### `url/toQuery`

:::code

此函数用于将`Object`或`Array`形式参数对象序列化成字符串形式的参数，一般在数据传输时调用。

> NOTE：如果`toQuery`方法的输入参数是`Array`形式，则其值必须是`{key:'参数名', value:'参数值'}`形式的对象。使用`Array`的优势在于可以控制序列化后的参数顺序

> NOTE：如果某个参数的值是数组，则会在生成的字符串形式中给参数名加上`[]`后缀。此行为与`jQuery.param`方法的行为保持一致.

```javascript
var toQuery = require('third/url/toQuery');
console.log(toQuery({
    team: '#0067ED',
    members: ['michael', 'john', 'jerry']
}));
// team=%230067ED&members%5B%5D=michael&members%5B%5D=john&members%5B%5D=jerry
console.log(toQuery([
    {
        key: 'members',
        value: ['michael', 'john', 'jerry']
    },
    {
        key: 'team',
        value: '#0067ED'
    }
]));
// members%5B%5D=michael&members%5B%5D=john&members%5B%5D=jerry&team=%230067ED
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| params | Object\|Array.\<Object\> | `Object`或`Array`形式的参数对象 | - | - | 否 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| string | 序列化之后的参数字符串 |
