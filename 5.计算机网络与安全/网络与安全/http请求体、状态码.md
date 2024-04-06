# 状态码

- 1 表示消息
  代表请求已被接受，需要继续处理。这类响应是临时响应，只包含状态行和某些可选的响应头信息，并以空行结束
- 2 表示成功
  代表请求已成功被服务器接收、理解、并接受
- 3 表示重定向
  表示要完成请求，需要进一步操作。 通常，这些状态代码用来重定向
- 4 表示请求错误
  代表了客户端看起来可能发生了错误，妨碍了服务器的处理
- 5 表示服务器错误
  表示服务器无法完成明显有效的请求。这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生

# 请求体

```http
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```

常见的请求字段如下表所示：

| 字段名            | 说明                                                                                                                                                                          | 示例                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Accept            | 能够接受的回应内容类型（Content-Types）                                                                                                                                       | Accept: text/plain                                                               |
| Accept-Charset    | 能够接受的字符集                                                                                                                                                              | Accept-Charset: utf-8                                                            |
| Accept-Encoding   | 能够接受的编码方式列表                                                                                                                                                        | Accept-Encoding: gzip, deflate                                                   |
| Accept-Language   | 能够接受的回应内容的自然语言列表                                                                                                                                              | Accept-Language: en-US                                                           |
| Authorization     | 用于超文本传输协议的认证的认证信息                                                                                                                                            | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==                                |
| Cache-Control     | 用来指定在这次的请求/响应链中的所有缓存机制 都必须 遵守的指令                                                                                                                 | Cache-Control: no-cache                                                          |
| Connection        | 该浏览器想要优先使用的连接类型                                                                                                                                                | Connection: keep-alive Connection: Upgrade                                       |
| Cookie            | 服务器通过 Set- Cookie （下文详述）发送的一个 超文本传输协议 Cookie                                                                                                           | Cookie: $Version=1; Skin=new;                                                    |
| Content-Length    | 以 八位字节数组 （8 位的字节）表示的请求体的长度                                                                                                                              | Content-Length: 348                                                              |
| Content-Type      | 请求体的 多媒体类型                                                                                                                                                           | Content-Type: application/x-www-form-urlencoded                                  |
| Date              | 发送该消息的日期和时间                                                                                                                                                        | Date: Tue, 15 Nov 1994 08:12:31 GMT                                              |
| Expect            | 表明客户端要求服务器做出特定的行为                                                                                                                                            | Expect: 100-continue                                                             |
| Host              | 服务器的域名(用于虚拟主机 )，以及服务器所监听的传输控制协议端口号                                                                                                             | Host: en.wikipedia.org:80 Host: en.wikipedia.org                                 |
| If-Match          | 仅当客户端提供的实体与服务器上对应的实体相匹配时，才进行对应的操作。主要作用时，用作像 PUT 这样的方法中，仅当从用户上次更新某个资源以来，该资源未被修改的情况下，才更新该资源 | If-Match: "737060cd8c284d8af7ad3082f209582d"                                     |
| If-Modified-Since | 允许在对应的内容未被修改的情况下返回 304 未修改                                                                                                                               | If-Modified-Since: Sat, 29 Oct 1994 19:43:31 GMT                                 |
| If-None-Match     | 允许在对应的内容未被修改的情况下返回 304 未修改                                                                                                                               | If-None-Match: "737060cd8c284d8af7ad3082f209582d"                                |
| If-Range          | 如果该实体未被修改过，则向我发送我所缺少的那一个或多个部分；否则，发送整个新的实体                                                                                            | If-Range: "737060cd8c284d8af7ad3082f209582d"                                     |
| Range             | 仅请求某个实体的一部分                                                                                                                                                        | Range: bytes=500-999                                                             |
| User-Agent        | 浏览器的浏览器身份标识字符串                                                                                                                                                  | User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0 |
| Origin            | 发起一个针对 跨来源资源共享 的请求                                                                                                                                            | Origin: http://www.example-social-network.com                                    |
