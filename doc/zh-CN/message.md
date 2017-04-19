## message 模块

此模块的函数主要用于跨域的父子`iframe`通讯。在支持`postMessage`方法的浏览器中使用`postMessage` API。在不支持的旧浏览器（IE6，7）中使用`window.navigator`共享的方法来实现类似功能。

一般消息接收方由两个参数决定：对应`iframe`的`window`对象，以及标识此`window`对象的唯一标识名。`window`对象用于`postMessage`的调用，唯一标识名用于在IE6、7下在共享`window.navigator`对象上区分不同的`window`对象的回调函数。

> NOTE：注意为了实现降级支持旧浏览器，此模块的函数不支持标签之间的通讯

### `message/listen`

:::code

此函数用于监听消息。

```javascript
var listen = require('S3/message/listen');
listen('parent', window, function (data) {
    console.log(typeof data.origin);        // string
    console.log(data.origin);               // source of message's origin
    console.log(typeof data.message);       // string
    console.log(data.message);              // message body
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| channel | string | `window`对象的唯一标识名 | - | - | 否 |
| context | window\|Element | `iframe`的dom对象，或者`window`对象 | - | - | 否 |
| callback | function(Object) | 收到消息之后的回调函数，参数值为`Object`类型。包含`message`和`origin`两个参数，它们都是字符串类型 | - | - | 否 |
