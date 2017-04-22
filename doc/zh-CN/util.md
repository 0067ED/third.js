## util模块

此模块内的函数都是工具类型的函数。

### `util/fif`

:::code

此函数实现了**Friendly iframe**（简称fif）方式的加载JS文件的方法。Friendly iframe是[IAB](https://www.iab.com/)（The Interactive Advertising Bureau）推荐的加载广告的方法。它一般有如下的特点：

1. 创建一个iframe，它的和父页面是同域的，不会收到同源策略影响
2. iframe内部有一个或多个script节点，它们会加载远程的JS文件
3. iframe内部的JS环境中有一个全局变量`inDapIF`，它的值为`true`
4. 被加载的远程JS文件需要从全局变量`inDapIF`此来判断当前加载它的方法是否是Friendly iframe（它们可能还需要兼容普通加载的方式）

> NOTE: 使用Friendly iframe方式加载JS文件有一个巨大的优势，就是不会block页面的load事件。

```javascript
var fif = require('third/util/fif');
fif('script.js', function (context, doc) {
    // TODO script loaded
});
fif(['script1.js', 'script2.js'], function (context, doc) {
    // TODO script loaded
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| url   | string\|Array.<string> | 单个或多个JS文件地址 | - | - | 否 |
| callback | function(Window, Document) | 回调函数，输入参数是iframe内的window和document对象 | - | - | 否 |
| options  | Object= | 可选配置 | - | - | 是 |
| options.fifMark  | string= | 替换`inDapIF`的变量名 | 'inDapIF' | - | 是 |
| options.context  | Window= | 在指定的window对象中创建friendly iframe节点 | 默认为当前JS的运行环境 | - | 是 |

#### 返回值

| 类型 | 描述 |
| ---- | ---- |
| Element | 新创建的`iframe`DOM节点 |


### `util/mqp`

:::code

此函数实现了[**The Method Queue Pattern**](http://www.lognormal.com/blog/2012/12/12/the-script-loader-pattern/)。

> NOTE: 使用此范式的一个优点是即使SDK尚未被加载，也可以先调用SDK之后会提供的接口。作为命令的形式存到队列里面，等SDK真正加载完成之后再去执行。

假设我们按照如下形式提供SDK的接口：

```javascript
var mqp = require('third/util/mqp');
(function () {
    var ExportApi = {
        ready(callback) {
            // TODO 在loaded之后执行 callback
        },
        send(message) {
            console.log(message);
        }
    };
    mqp('__mq', ExportApi);
})();
```

在外部调用时就可以采用如下的代码形式，可以看到push进数组的命令自身也是数组类型。它的第一项对应了`ExportApi`（即代理API）的函数名。

```html
<script>
    __mq = __mq || [];
    __mq.push(['send', 'message']);
    __mq.push(function () {
        // TODO loaded
    });
</script>
<script src="exportApi.js" async></script>
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| targetName | string | 接口名 | - | - | 否 |
| proxy    | Object   | 被代理的API接口 | - | - | 否 |
| options  | Object= | 可选配置 | - | - | 是 |
| options.ready    | string= | 替换`ready`的属性名 | 'ready' | - | 是 |
| options.context  | Window= | 在指定的window对象中注入接口 | - | - | 是 |
| options.callback | function(Object, string, Object) | 调用代理API的处理函数 | 以数组第一项作为方法名去查找代理API对象并调用执行 | - | 是 |



:::code
如果通过函数名来调用代理API的方式不能满足你的需求，则可以自定义`options.callback`这个回调函数。样例如下：

```javascript
var mqp = require('third/util/mqp');
(function () {
    var ExportApi = {
        ready(callback) {},
        send(data) {
            console.log(message);
        },
        event(data) {
            console.log(message);
        }
    };
    // 白名单
    var WHITE_LIST = 'send,event'.split(',');
    mqp('__mq', ExportApi, {
        callback: function (proxy, method, params) {
            if (!~WHITE_LIST.indexOf(method)) {
                return;
            }
            proxy[method].apply(proxy, params);
        }
    });
})();
```

可以看到我们通过自定义`options.callback`函数，实现了一个白名单列表，只有白名单内的方法名才能被执行。

```html
<script>
    __mq = __mq || [];
    __mq.push(['send', 1, 2]);
    __mq.push(['event', 1, 2]);     // 此行不会起作用，`ExportApi.event`方法不会被调用
</script>
<script src="exportApi.js" async></script>
```
:::


### `util/inherits`

:::code

此函数实现了简易的类继承功能。

```javascript
var inherits = require('third/util/inherits');
function Father(firstName) {
    this.firstName = firstName;
    this.lastName = 'zhou';
}
Father.prototype.myName = function () {
    return this.firstName + this.lastName;
};

function Son(firstName) {
    Son.superClass.constructor.call(this, firstName);
}

inherits(Son, Father);
console.log(new Son('mm').myName());   // mmzhou
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| subClass   | Function | 子类的构造函数 | - | - | 否 |
| superClass | Function | 富类的构造函数 | - | - | 否 |


### `util/log`

:::code

此函数对`console.log`做了简单的封装，确保在浏览器不支持`console.log`API的时候不会报错。同时也支持`console.group`和`console.groupEnd`方法。

> NOTE: 此函数不应该在实际的生产环境中使用，建议仅用于一些特殊情况下的debug。

```javascript
var log = require('third/util/log');
log.group('THIRD');
log('message');
log.groupEnd();
```
:::

#### `log`函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| message | string | 需要打印的字符串 | - | - | 否 |

#### `log.group`函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| groupName | string | 日志组的名字 | - | - | 否 |
