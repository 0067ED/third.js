## Thrid.js入门教程

Thrid.js是用于第三方Javascript SDK开发的前端工具库。

所谓第三方Javascript SDK，就是第三方服务商将自己的服务通过SDK的形式提供给网站使用。
由于Javascript的动态特性，一般的第三方SDK都会直接或间接的提供Javascript文件给网站页面加载。常见的Javascript SDK可以分为如下几类：

1. 组件类，此类SDK是以小块的UI组件的形式提供给开发者使用。例如：[Disqus](https://disqus.com/)、[Facebook赞按钮](https://developers.facebook.com/docs/plugins/like-button)、[Google MAP API](https://developers.google.com/maps/documentation/javascript/?hl=zh-cn)
2. 检测类，此类SDK没有明显的界面，一般用于网站分析、性能检测、错误监控。例如：用于网站分析的[Google Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/)和用于错误监控的[Rollbar](https://rollbar.com/)
3. 网站API包装类，此类是网站固有的HTTP接口的包装，以库的形式提供给开发者使用。例如：[Facebook 图谱 API](https://developers.facebook.com/docs/graph-api)、[Dropbox SDK](https://github.com/dropbox/dropbox-sdk-js)

大部分的SDK都有这几个问题：它们所运行的环境都是不确定的（除非你有明确的环境运行要求），你在开发SDK时都不会知道使用你的SDK网站的用户会使用什么样的浏览器，什么样的操作系统。它们的使用者的能力不一，甚至有可能是非程序员在使用。所以第三方Javascript SDK在开发时，一般要满足做到如下要求：

1. 鲁棒性，SDK需要兼容尽可能多的兼容各种浏览器，处理和测试尽可能多的边界条件
2. 控制SDK大小，SDK越小对用户页面的影响也越小。所以SDK要尽量少依赖jQuery这样的通用库，你需要一个容易拆分的JS工具库，只使用其中必要的功能
3. 向前兼容，因为JS SDK通常是被打包到开发者的页面中去的，用户更新SDK的成本是很高的，所以一定要确保SDK的向前兼容
4. 易用性，API越是简单易用的SDK，越是容易被推广

## Third.js的优势

Third.js 采用了模块化开发的方式，每个功能函数都是一个单独的模块。SDK的开发者可以仅仅require自己需要的模块，然后使用webpack/rollup这样的工具实现打包。就可以最大限度地控制SDK的大小。

Third.js 提供了很多的专用于第三方JS SDK开发的工具类函数，同时也提供了很多的第三方JS开发的最佳实践。例如：数据的跨域发送、跨域消息发送、cookie的跨子域跨路径获取、判断页面是否处于预览或预渲染模式中、使用Friendly IFrame来加载额外JS脚本等等。

同时 Third.js 还内置了沙盒机制，不会因为SDK的使用者修改了某些全局API就导致SDK出现bug。Third.js 也支持大部分的浏览器，甚至兼容了包括IE6在内的旧浏览器。

## Third.js的最佳实践

1. 跨域发送
    1. ping
    2. JSONP
    3. submit
2. 跨域消息发送
3. cookie的跨路径获取操作
4. JS加载
5. SDK API接口
6. 其他小技巧
