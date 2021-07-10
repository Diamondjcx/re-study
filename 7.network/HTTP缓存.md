##### HTTP 缓存

- 动机：
  - 当浏览器加载一个 html 页面时，一些外部资源如 js\css\img 不经常变化。如果每次都加这些资源，会导致资源浪费，加载时间过长，影响用户体验
  - 将静态资源存储在浏览器内部，下次请求相同资源可以直接使用。
- 作用：
  - 提高首屏加载速度，优化用户体验
  - 减少流量消耗
  - 减轻服务器压力
- 强缓存策略：不用请求后台，某种规则定义，通过对比更新时间，设置过期时间，不管浏览多少次，都不去请求

  - HTTP 1.0
    - expires
    ```
    expires: Thu,03 Jan 2019 11:43:04 GMT
    res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toUTCString())
    它是一个时间戳，当客户端再次请求服务器的时候，会把客户端的时间与该时间戳进行对比，如果大于该时间戳则已过期，否则直接使用该缓存资源
    ```
    - 问题：客户端和服务端的时间快慢不一致；客户端的时间可以随意修改，所以不一定可以达到预期
  - HTTP 1.1

    - cache-control

    ```
    public: 所有内容都将被缓存（客户端和代理服务器都可以缓存）
    private: 内容之缓存到私有缓存中（客户端可以缓存）
    no-cache: 需要协商缓存来验证缓存数据
    no-store: 所有内容都不会缓存
    must-revalidation/proxy-revalidation:如果缓存的内容失败，请求必须发送到服务端进行重新验证
    max-age =***：缓存的内功将在***秒后失效，在http1.0中使用，可与Last-Modified一起使用，优先级较高

    Lat-Modified：是服务端生成的，准确

    res.setHeader('Cache-Control', 'max-age= 20')
    20秒之后过期失效
    ```

- 协商缓存策略：问后台，这个有没有更新。更新不固定，用还是不用
  - last-modified & if-Modified-since 基于时间，最后修改时间，如果在此之后修改了，则更新,服务端决定修改时间
  ```
  res.setHeader('Cache-Control','no--cache')
  res.setHeader('Last-modified', new Date().toUTCString())
  // 比比谁老
  if (new Date(res.headers['if-modified-since']).getTime() + 3 *1000 > Date.now()) {
      <!-- 协商缓存命中 -->
  }
  ```
  - Etag & if-None-Match : 基于内容，缓存内容的摘要和后台服务器的摘要进行对比
  ```
  res.setHeader('Etag', hash)
  if (req.headers['if-None-Match'] === hash) {
      <!-- 缓存命中 -->
  }
  ```
