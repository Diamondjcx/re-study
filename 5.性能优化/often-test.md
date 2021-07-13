用户体验 访问量

1、性能关键因子

浏览器如何工作的？ 发送请求 接收请求
延迟、带宽、静态资源、DNS 解析、TCP/TLS

2、性能测量
PageSpeed insights
Chrome User Experience Report
Audit Panel
Performance Budget
Profile Panel :可能进行优化的点
Lighthouse CI

3、针对性优化
 
 3.1 优化延迟
 
CND 将 content 分布到各个地方

Cache：减少客户端与服务端的交互
缓存当然是最快的，比任何服务器/cdn 都快
通过 Cache-Control HTTP 表头合理制定缓存
真正的静态元素也许可以被设置为永久可用
使用 hash tag
Etag 也是有性能消耗的

 3.2 优化带宽使用，谷歌浏览器设置网络，进行测试

延迟加载

- 懒加载 lazy-load offscreen images 在屏幕中才去加载
- 提前加载资源
  渲染所必须的资源
  Preload 引导浏览器更早加载关键资源
  ```css
  link  rel='preload'
  ```
  Prefetch
  告知浏览器某个资源可能会被使用
  浏览器可以在空闲时间下载这些资源
  用户在真正需要这些资源时，不再需要下载
  - 难以预料的用户行为
  - 带宽浪费
  - Predictive prefetch
- 不加载资源
  cache

  3.3 优化静态资源文件
  Broti:开源数据压缩程序表、转为 http 传输进行优化

  HTTP2:头文件压缩、HPACK

  Minification:牺牲代码可读性，减少文件体积、通过调用成熟的库来实现（webpack）
  Tree Shaking：识别代码/Library 中的 dead code；确保在输出文件中不包括 dead code
  移除昂贵的 Library：有些 Library 可以非常大；可能并不真的那么需要它（写几句代码就可以实现了） webpack bundle 图

  3.4 DNS 优化
  限制 Domain 数量：控制第三方 domain 数量；不要使用 Domain Sharding（开了很多域名）
  DNS prefetch

  3.5 减少 TCP 开销

  减少页面重定向
  页面重定向非常昂贵，重定向之后，所有的 tcp 需要重新建立连接
  Rewrite
  SPA
  使用 CDN:更低的延迟 更小的 tcp 连接
