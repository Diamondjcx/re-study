https://zhuanlan.zhihu.com/p/79350395

# DNS Domain Name System，域名系统

ip 长且难记，通过 ip 访问网站不方便，所以可以通过 DNS 服务器
输入网址，通过 DNS 服务器将域名解析为 ip 地址，实际访问的就是 ip 地址了

## what 是什么

总结： ip 与域名相互映射的一个分布式数据库，能够使人更方便的访问互联网

## 结构

www.baidu.com.
. ：属于根域名
.com : 顶级域名
.baidu : 二级域名 可申请
www : 三级域名

DSN 解析是分布式存储的

1、根域名服务器：存放顶级域名服务器地址

2、顶级（一级）域名服务器：存储一些一级域名的权威 DNS 服务器地址

- gTLD：国际顶级域名(generic top-level domains，gTLD)，例如：.com/.net/.org 等都属于 gTLD;
- ccTLD：国家和地区顶级域名(country code top-level domains，简称 ccTLD)，例如：中国是.cn 域名，日本是.jp 域名;
- New gTLD：新顶级域名(New gTLD)，例如：.xyz/.top/.red/.help 等新顶级域名。

3、本地域名服务器：一般为运营商的 DNS，主要作用是代理用户进行域名分析的。

## 查找原理

用户输入网址时
1、浏览器会在自己的缓存中查找 URL 对应 IP 地址，如果之前访问过，保存了这个 URL 对应 ip 地址的缓存，直接访问 ip 地址
2、若没有，通过计算机的 Host 文件的配置，可以设置 URL 和 ip 的映射关系
3、Host 文件中也没有，请求 Local DNS Server，通过本地运营商获取
4、通过 Root DNS Server 进行解析，会根据请求返回给 Local DNS Server 顶级域名的服务器地址
5、返回顶级域名服务器地址之后，访问此地址，返回 Name Server 服务器地址，这个 Name Server 就是网站注册的域名服务器，上面包含了 URL 和 Ip 对应的信息（申请服务提供商 运营商维护

## TCP 和 UDP

DNS 既使用了 TCP 又使用了 UDP

## TCP 与 UDP

TCP：面向连接的协议，提供可靠的数据传输，一般服务质量要求比较高的情况，使用这个协议。

UDP：用户数据报协议，是一种无连接的传输层协议，提供面向事务的简单不可靠信息传送服务。

- 区别：
  如何实现信息的可靠传递方面不同

DNS 在进行区域传输的时候使用 TCP 协议，其他时候则使用 UDP 协议

2 种类型的服务器：主 DNS 服务器 辅助 DNS 服务器

区传送：在一个区中主 DNS 服务器从本机的数据文件中读取该区的 DNS 数据信息，而辅助 DNS 服务器则从区的主 DNS 服务器中读取该区的 DNS 数据信息。

区域传送时使用 TCP

- 辅助域名服务器会定时向主域名服务器进行查询以便了解数据是否有变动，如有变动，则会执行一次区域传送，进行数据同步。区域传送将使用 TCP 而不是 UDP，因为数据同步传送的数据量比一个请求和应答的数据量要多得多
- TCP 是一种可靠的连接，保证了数据的准确性

域名解析使用 UDP 协议

客户端向 DNS 服务器查询域名，一般返回的内容都不超过 512 字节，用 UDO 传输即可。不用经过 TCP 三次握手，这样 DNS 服务器负载更低，响应更快

## DNS 预解析优化

可以通过用 meta 信息来告知浏览器，我这个页面要做 DNS 预解析

 <meta http-equiv="x-dns-prefetch-control" content="on" />

可以用 link 标签来强制对 DNS 做预解析

<link rel="dns-prefetch" href="http://ke.qq.com/" />

当客户端的 DNS 缓存为空时，DNS 查找的数量与 Web 页面中
