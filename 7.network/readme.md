# node - tcp/http/koa 解析

0-20 网络协议概念
20-45 TCP连接、HTTP连接
45-60 后端架构简介
60-105 Koa

## 计算机网络
- CDN
    - CDN原理
    - DNS原理
- tcp 相关的知识：
    - 三次握手、四次挥手，拥塞、滑动窗口；
- http 相关的知识：
    - 协议：http1.0 - http1.1-https-http2-http3; - 优点、缺点、特点；
    - http 状态码；
    - 简单请求、复杂请求对应的首部；
    - http cors；
    - content-type；

## 课程内容

### TCP/IP 协议
#### ISO/OSI七层模型
- 应用层：提供应用服务：HTTP, HTTPS, FTP, TELNET, SMTP...
- 表示层：数据transform
- 会话层：
- 传输层：实现端到端的传输： TCP / UDP...
- 网络层：IP协议。 -- 包 -- 路由器
- 数据链路层：-- 帧 -- 交换机
- 物理层： -- 比特流 --

#### TCP/IP模型（4层）
- 应用层
- 传输层
- 网络层
- 网络接口/访问层

#### 什么是协议
- 语法、语义和时序。
- 约定了每一层干啥事。

#### TCP协议（传输层）
- TCP 的全称叫传输层控制协议（Transmission Control Protocol），⼤部分应⽤使⽤的正是 TCP 传输层协议，⽐ 如 HTTP 应⽤层协议。TCP 相⽐ UDP 多了很多特性，⽐如流量控制、超时重传、拥塞控制等，这些都是为了保证数据包能可靠地传输给对⽅。
#### UDP协议（传输层）
- UDP 就相对很简单，简单到只负责发送数据包，不保证数据包是否能抵达对⽅，但它实时性相对更好，传输效率也⾼。当然，UDP 也可以实现可靠传输，把 TCP 的特性在应⽤层上实现就可以，不过要实现⼀个商⽤的可靠 UDP 传输协议，也不是⼀件简单的事情。
#### IP协议（网络层）
- ⽹络层最常使⽤的是 IP 协议（Internet Protocol），IP 协议会将传输层的报⽂作为数据部分，再加上 IP 包头组装 成 IP 报⽂，如果 IP 报⽂⼤⼩超过 MTU（以太⽹中⼀般为 1500 字节）就会再次进⾏分⽚，得到⼀个即将发送到⽹ 络的 IP 报⽂。
⽹络层负责将数据从⼀个设备传输到另⼀个设备，这个过程中就是靠IP地址

### TCP 链接 和 HTTP 链接的 Demo

### Koa

#### Koa.use(fn)
有很多的 use 方法，参数是一个 fn 函数；
都收集在了 this.middleware

#### listen -- 执行
本质上，是原生http 的
`const server = http.createServer(this.callback());`
那么，this.callback() 执行的结果应该是一个，具备 req 和 res 的函数。

#### this.callback

1. 我用了一个 compose 的方法，把middleWare 里面所有的 fn，编排执行了。
2. 返回了
```js
(req, res) => {
    const ctx = this.createContext(req, res);
    return this.handleRequest(ctx, fn);
};
```

#### 所以我们下面关心的是：
```js
 const fnMiddleware = compose(this.middleware);
 fnMiddleware(ctx)
 ```
 是怎么把这些个 use 的 fn 编排起来的。

