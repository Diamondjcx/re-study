# 浏览器缓存

what：浏览器缓存保存着用户通过 HTTP 获取的所有资源，再下一次请求时可以避免重复向服务器发出多余的请求

就是在你访问过一次某个网站之后，这个站点的文字、图片等所有资源都被下载到本地了，下次再访问该网站时判断是否满足缓存条件，如果满足就不用再花费时间去等待资源的获取了

why：提高网站性能

通常情况下的步骤是:

1. 客户端向服务器发出请求，请求资源
2. 服务器返回资源，并通过响应头决定缓存策略
3. 客户端根据响应头的策略决定是否缓存资源（这⾥假设是），并将响应头与资源缓存下来
4. 在客户端再次请求且命中资源的时候，此时客户端去检查上次缓存的缓存策略，根据策略的不同、是否过期等判断 是直接读取本地缓存还是与服务器协商缓存

分类：强缓存 + 协商缓存

- 强缓存：满足强缓存命中规则，则不会再像服务器发送请求。

  - 判断条件：根据`Response header`中的 Expire、Cache-control 判断
    - Expire：过期时间
      缺点：为绝对时间，如果修改客户端时间，缓存就会失效
    - Cache-control：`max-age`相对时间，资源缓存的最大时间
      ```
      Cache-Control:max-age=600   缓存的最大有效时间为600s
      ```
      属性值：
      no-cache：需要进行协商缓存，发送请求到服务器确认是否使用缓存。
      no-store：禁止使用缓存，每一次都要重新请求数据。
      public：默认设置。
      private：不能被多用户共享。
  - Cache-control 优先于大于 Expire

- 协商缓存：强缓存没有命中时，浏览器会发送一个请求到服务器，服务器根据请求头中的部分信息来判断是否命中缓存。如果命中，则返回 304，告诉浏览器资源未更新，可使用本地缓存
  - 判断条件：资源标识`If-Modify-Since`或`Etag`发送给服务器，未更新，则请求响应 304+`Not Modify`
    - Last-Modified，If-Modified-Since 第一次请求，服务会返回最后修改时间。再次请求时，请求携带的上一次修改的时间。
      缺点：最小单位是秒。如果短时间内修改，Last-Modified 并不会改变  
       一个周期内又改回了原来的样子，我们认为是可以使用缓存的，但是 Last-Modified 不这么认为
    - Etag，If-None-Match：由文件内容 hash 生成的，可以保证资源的唯一性，资源发生改变就会导致 Etag 发生变化
  - 优先校验 Etag，如果 Etag 相等就会继续比对 Last-Modified

Size 中会出现的情况

- 200 from disk cache 磁盘缓存 不请求网络资源，在磁盘当中，一般非脚本会存在磁盘当中
- 200 from memory cache 内存缓存 不请求网络资源，资源在内存当中，一般脚本、字体、图片会存在内存当中
- 200 资源大小数值 从服务器下载最新资源
- 304 报文大小 请求服务端发现资源没有更新，使用本地资源

用户行为对浏览器缓存的影响

- 打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。
- 普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。
- 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control:no-cache(为了兼容，还带了 Pragma:no-cache),服务器直接返回 200 和最新内容。

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
