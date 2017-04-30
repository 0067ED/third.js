## main模块

此模块内的函数都是入口函数，使用Third.js一般从此模块开始。

### `run`

:::code

此函数是Third.js的入口级函数。它处理了如下三种因素：

1. 页面处于`previewLoad`的情况下不会执行回调函数
2. 页面处于`prerender`的情况下是暂时不会执行回调函数，等页面可见时再执行
3. 获取window对象的策略自动兼容了JS文件被`util/fif`函数加载时候的情况，使其可以拿到正确的window对象

```javascript
var run = require('third/run');
run(function (win) {
    // TODO
});
```
:::

#### 函数的参数

| 参数名 | 类型 | 描述 | 默认值 | 可选值 | 是否可选 |
| ----- | ---- | ---- | ----- | ------ | ------- |
| main  | function(Window) | 回调函数 | - | - | 否 |
| options | Object= | 可选配置 | - | - | 是 |
| options.context | Window= | 指定`window`对象，而非使用默认的策略 | 'z' | - | 是 |
