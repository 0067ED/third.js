## request 模块


### `request/ping`

:::code

向指定服务器地址发送ping请求，传输数据。如果你需要发送的数据量较轻，并且不在乎发送的返回结果，那么使用这个方法发送数据。ping请求会采用三种数据传输方法之一来发送数据：

1. 图片方式的请求（创建一个`Image`实例，指定接口地址为`Image`实例的`src`值）
2. 调用`navigator.sendBeacon`方法发送跨域请求
3. 调用`XMLHttpRequest`对象发送跨域请求

```javascript
var ping = require('S3/request/ping');
ping('/api/ping', {
    id: '0067ED',
    data: [2, 3, 4]
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | 请求地址 | - | - | 否 |
| params | Object|string|Array.<Object> | 请求参数 | - | - | 否 |
| options | Object | 可选配置 | - | - | 是 |
| options.randomKey | string | 当使用`Image`实例来发送数据时，为避免缓存会自动添加一个随机串字段。`randomKey`是随机串的字段名 | 'z' | - | 是 |
| options.transport | string | 强制使用一种数据传输方法，默认会自动选择最优的一种 | 'auto' | 'img', 'xhr', 'beacon' | 是 |
| options.callback | function(Error=) | 发送的回调函数，如果失败会传一个`Error`实例作为输入 | - | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| boolean | 是否已发送（为true时不能代表发送成功，只能说明已尝试发送 |


### `request/jsonp`

:::code

向指定服务器地址发起JSONP请求。

```javascript
var jsonp = require('S3/request/jsonp');
jsonp('/api/ping', function (error, data) {
    if (error) {
        // something going wrong.
        return;
    }

    console.log(data);
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | 请求地址 | - | - | 否 |
| callback | function(Error=, *) | 回调函数。如果请求出错，第一个参数为`Error`实例，否则为`null`。第二个参数为JSONP回调的返回数据 | - | - | 否 |
| options | Object | 可选配置 | - | - | 是 |
| options.timeout | number | 超时时间（以毫秒为单位） | 10000 | - | 是 |
| options.charset | string | script标签的编码格式 | 'utf-8' | - | 是 |
| options.query | string | 指定回调函数名字的字段名 | 'callback' | - | 是 |
| options.parent | Node | script标签的父节点，如果你希望script标签插入到指定的节点下面，则可以使用这个参数 | 自动选择当前页面下的位置 | - | 是 |


### `request/submit`

:::code

向指定服务器地址发起跨域请求。如果你需要发送大量的数据，甚至发送图片，并且非常关心返回的数据，那么需要使用这个函数。submit请求一般会采用两种数据传输方法之一：

1. 调用`XMLHttpRequest`对象发送跨域请求
2. 使用`iframe`加`form`表单来发起跨域请求

```javascript
var submit = require('S3/request/submit');
var data = {
    id: '0067ED',
    data: [1, 2, 3]
};
submit('/api/submit', data, function (error, data) {
    if (error) {
        // something going wrong.
        return;
    }

    console.log(data);
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url | string | 请求地址 | - | - | 否 |
| params | Object|string|Array.<Object> | 请求参数 | - | - | 否 |
| callback | function(Error=, *) | 回调函数。如果请求出错，第一个参数为`Error`实例，否则为`null`。第二个参数为JSONP回调的返回数据 | - | - | 否 |
| options | Object | 可选配置 | - | - | 是 |
| options.dataType | string | 返回数据的类型 | 'json' | 'json', 'text' | 是 |
| options.charset | string | 采用`iframe`加`form`表单来发起跨域请求时，使用此参数来设置编码格式 | 'utf-8' | - | 是 |
| options.context | window | 采用`iframe`加`form`表单来发起跨域请求时，使用此参数来设置`iframe`标签所在的位置 | JS所在的上下文环境中的window对象 | - | 是 |

:::code

#### 文件上传及表单提交

当需要上传文件时，传递给`submit`函数的参数需要变成`form`表单的node节点。

```html
<form id="submitForm" method="post" enctype="multipart/form-data">
    <input type="text" name="username" value="zmmbreeze"></input>
    <input type="password" name="password" value="1234567"></input>
    <input type="file" name="head"></input>
</form>
<script>
var submit = require('S3/request/submit');
var submitForm = document.getElementById('submitForm');
var data = {
    id: '0067ED',
    data: [1, 2, 3]
};
submit(submitForm, function (error, data) {
    if (error) {
        // something going wrong.
        return;
    }

    console.log(data);
});
</script>
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| form | Element | 表单的DOM节点 | - | - | 否 |
| callback | function(Error=, *) | 回调函数。如果请求出错，第一个参数为`Error`实例，否则为`null`。第二个参数为JSONP回调的返回数据 | - | - | 否 |
| options | Object | 可选配置 | - | - | 是 |
| options.dataType | string | 返回数据的类型 | 'json' | 'json', 'text' | 是 |
| options.charset | string | 采用`iframe`加`form`表单来发起跨域请求时，使用此参数来设置编码格式 | 'utf-8' | - | 是 |
| options.context | window | 采用`iframe`加`form`表单来发起跨域请求时，使用此参数来设置`iframe`标签所在的位置 | JS所在的上下文环境中的window对象 | - | 是 |
