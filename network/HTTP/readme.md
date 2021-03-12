# GET和POST的区别
知乎中优秀的回答：https://www.zhihu.com/question/28586791

结论：协议是人定的。两者没有实质性的区别

## 浏览器的GET和POST
特指的是非Ajax的HTTP请求，从浏览器和HTTP诞生就一直使用的HTTP协议中的GET/POST。
浏览器用GET请求来获取一个html页面/图片/css/js等资源；用POST来提交一个<form>表单，并得到一个结果的网页。

- GET
 - 读取一个资源。GET一个html文件，反复读取不应该对访问的数据产生副作用---幂等

 - GET是请求数据，可以对数据进行缓存（浏览器、nginx、server端）

 - 浏览器发送GET请求时，会在url后面带一些参数（浏览器直接发出的GET请求只能是通过url--浏览器中直接输入或者是点击a标签


- POST
 - 点击submit元素，会发送一个post请求，让服务端去做一件事，反复提交，会产生副作用---非幂等

 - 不幂等意味着不可以执行多次，因此就不可以缓存，也不可以保存为标签（点一次，下一次单，好恐怖

 - 浏览器中POST请求都来自表单提交。每次提交，被浏览器用编码到HTTP请求的body里（
   浏览器在POST一个表单时，url上也可以带参数，只要<form action="url" >里的url带querystring就行。
   只不过表单里面的那些用<input> 等标签经过用户操作产生的数据都在会在body里。
  - application/x-www-form-urlencoded用来传输简单的数据：key1=value1&key2=value2
  - multipart/form-data:传文件,如果采用另外一种方式，对二进制文件处理很低效

## 接口中的GET和POST
这里指的是浏览器的Ajax api，没有浏览器那么多限制，但是太自由也不好，所以会出现相应的一些标准，比如REST
REST中GET和POST不是随便用的

  - GET】 + 【资源定位符】被专用于获取资源或者资源列表
  ```javascript
  GET http://foo.com/books          获取书籍列表
  GET http://foo.com/books/:bookId  根据bookId获取一本具体的书
  ```
  幂等--可缓存

  - 【POST】+ 【资源定位符】则用于“创建一个资源”

## 关于安全性
从攻击的角度，无论是GET还是POST都不够安全
因为HTTP本身是明文协议。每个HTTP请求和返回的每个byte都会在网络上明文传播，不管是url,header还是body

避免：客户端到服务器端端加密。
通行做法：https--用SSL协议协商出的密钥加密明文的http数据。

## 关于编码
所谓编码确切地说应该是http中的url用什么编码，body用什么编码

url:字符编码（大部分是utf8）+Percent Encode翻译为真正的url发给服务器
body：Content-Type定义请求body的格式和字符

## 浏览器的POST需要发送两个请求吗？
结论：发一次还是发N次，客户端可以很灵活的决定，不管怎么发都是符合HTTP协议的。
因此应该视为这种优化是一种实现细节。

先发送请求头给服务器，让服务器进行校验，如果通过了，客户端再把剩下的数据发给服务器，拒绝，回复个错误，交互终止。避免浪费贷款传请求体。

### 到底什么算请求体
HTTP协议角度，"请求头"就是Method + URL(含querystring) + Headers 再后面都是请求体

对于HTTP代理
- 支持转发规则，比如nginx先要解析请求头，拿到URL和Header才能决定怎么做（转发proxy_pass，重定向redirect，rewrite后重新判断……）
- 需要用请求头的信息记录log。尽管请求体里的数据也可以记录，但一般只记录请求头的部分数据。
- 如果代理规则不涉及到请求体，那么请求体就可以不用从内核态的page cache复制一份到用户态了，可以直接zero copy转发。这对于上传文件的场景极为有效。……

对于HTTP服务器
- 可以通过请求头进行ACL控制，比如看看Athorization头里的数据是否能让认证通过
- 可以做一些拦截，比如看到Content-Length里的数太大，或者Content-Type自己不支持，或者Accept要求的格式自己无法处理，就直接返回失败了。
- 如果body的数据很大，利用Stream API，可以方便支持一块一块的处理数据，而不是一次性全部读取出来再操作，以至于占用大量内存。

## 关于URL的长度
GET数据有长度限制：其实是指”URL的长度限制“
HTTP协议本身对URL没有任何限制，这些限制是客户端/浏览器和服务端共同决定的

如果url过长，会分配更多的内存，并发量很高，可能会挤爆服务器；影响搜索引擎的的爬虫

# 常见的状态码

2**  成功：表明请求被正常处理了

200  ok 表示从客户端发来的请求在服务器被正确处理
204  No content 表示请求成功，但响应报文不含实体的主体部分
206  Partial Content 进行范围请求成功

3**  重定向（表明浏览器需要执行特殊处理
301  moved permanently,永久性重定向，表示资源已被分配了新的URL
302  found 临时性重定型，表示资源临时被分配了新的URL
303  see other 表示资源存在着另一个URL，应使用GET方法获取资源
304  not modified，表示服务器允许访问资源，但请求未满足条件的情况（与重定向无关）
307  temporary redirect 临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求

4XX客户端错误400bad request，请求报文存在语法错误

401unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
403forbidden，表示对请求资源的访问被服务器拒绝，可在实体主体部分返回原因描述
404not found，表示在服务器上没有找到请求的资源


5XX服务器错误500internal sever error，表示服务器端在执行请求时发生了错误

501Not Implemented，表示服务器不支持当前请求所需要的某个功能
503service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求

