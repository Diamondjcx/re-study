# HTTP1.x

近年来加载网站首页需要下载的数据量在逐渐增加

## 缺陷

- 协议规定客户端对同一域的并发连接最多只能2个，但是现代网页平均一个页面需要加载40个资源
- 线头阻塞问题：同一个连接中的请求，需要一个接一个串行发送和接收
- 基于文本协议，请求和相应的头信息非常大，并且无法压缩
- 不能控制响应优先级，必须按照请求顺序响应
- 只能单向请求，客户端请求什么，服务器只能返回什么

# HTTP2

多路复用、HPACK头压缩、流+二进制帧和流优先级

## 特性

- 传输内容使用二进制协议
- 使用帧作为最小传输单位
- 多路复用
- 头压缩
- 服务器推送
- 优先级与依赖性
- 可重置
- 流量控制
- 基于HTTPS来实现HTTP2

2.1 二进制
  HTTP1.x 时代，传输内容和头信息，都是文本/ASCII编码
    好处：直接从请求中观察出内容
    坏处：并发传输很困难（存在空格或其他字符，很难判断消息的起始和结束）
  二进制传输
    传输内容只有1和0,通过'帧'规范规定格式，轻易识别出不同类型内容
    更小的传输体积。

2.2 二进制分帧

  实现突破性能限制，改进传输性能，实现低延迟和高吞吐量：在应用层和传输层之间增加了二进制分帧层

2.3 多路复用和流

  流：帧的分组集合
  多路复用：解决并发问题  通过一个 TCP 连接就可以传输所有的请求数据

2.4 头压缩

  HTTP协议是无状态的，每个请求互不关联，如果想要区分，请求需要携带Cookie头，或服务器session等凡是模拟出“状态”。而使用Cookies头的缺点是携带庞大的重复信息并且无法压缩，造成带宽浪费

  HPACK，为头部压缩设计的算法
  首部表：客户端和服务器端使用“首部表”来跟踪和存储之前发送的键值对，只需要发送一次

2.5 服务器推送

  缓存推送，当一个客户端请求资源X，而服务器知道它可能也需要资源Z的情况下，服务器可以在客户端发送请求Z之前，主动将资源Z推送给客户端。

2.6 优先级与依赖性

  每个流都有优先级，资源有限时，服务器会根据优先级来选择应该先发送哪些流。

2.7 可重置

  当一个含有确切值的Content-Length的HTTP消息被送出之后，很难中断。通常可以断开TCP链接，会导致需要通过三次握手来重新建立一个新的TCP连接。

  更好的方案：只终止当前传输的消息并重新发送一个新的。
  HTTP2，通过发送RST_STREAM 帧来实现这种需要，从而避免浪费贷款和中断已有的连接。

2.8 流量控制

  每个http2流都拥有自己的公示流量窗口，可以限制另一端发送数据。

## 总结
我们来归纳一下使用 HTTP2 能带来的好处：

  更小的传输体积，更小或者省略重复的头消息
  突破原有的 TCP 连接并发限制，使用一个 TCP 连接即可实现多请求并发，单链接也能减轻服务端的压力（更少的内存和 CPU 使用）
  解决 HOLB 线头问题，慢的请求或者先发送的请求不会阻塞其他请求的返回
  结合 CDN 提供实时性更高，延迟更低的内容分发代理服务，大大减少白屏时间
  数据传输优先级可控，使网站可以实现更灵活和强大的页面控制
  能在不中断 TCP 连接的情况下停止（重置）数据的发送



# HTTP3

  HTTP2缺点：主要由TCP协议造成的
  - TCP以及TCP+TSL建立连接的延时
    HTTP2使用TCP协议来传输，如果使用HTTPS的话，还需要使用TLS协议进行安全传输，TSL也需要一个握手过程，所以需要有两个握手延迟过程

  - TCP的队头阻塞并没有彻底解决
    多个请求跑在一个TCP管道中，当出现丢包时，HTTP2不如HTTP1，因TCP为了保证可靠传输，丢失的包必须要等待重新传输确认，HTTP2 出现丢包时，整个TCP都要开始等待重传，会阻塞该TCP连接中的所有请求


  HTTP3 QUIC协议，让HTTP跑在QUIC上而不是TCP上。

  QUIC基于UDP
  - 实现类似TCP的流量控制、传输可靠性
  - 实现了快速握手功能
  - 继承了TCP加密功能
  - 多路复用，彻底解决TCP中队头阻塞问题


# 总结

HTTP/1.1有两个主要的缺点：安全不足和性能不高。
HTTP/2完全兼容HTTP/1，是“更安全的HTTP、更快的HTTPS"，头部压缩、多路复用等技术可以充分利用带宽，降低延迟，从而大幅度提高上网体验；
QUIC 基于 UDP 实现，是 HTTP/3 中的底层支撑协议，该协议基于 UDP，又取了 TCP 中的精华，实现了即快又可靠的协议