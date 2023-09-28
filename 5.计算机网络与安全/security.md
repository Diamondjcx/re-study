# 面试官：web 常见的攻击方式有哪些？如何防御？

![](https://static.vue-js.com/d0892930-8d1d-11eb-ab90-d9ae814b240d.png)

## 一、是什么

Web 攻击（WebAttack）是针对用户上网行为或网站服务器等设备进行攻击的行为

如植入恶意代码，修改网站权限，获取网站用户隐私信息等等

Web 应用程序的安全性是任何基于 Web 业务的重要组成部分

确保 Web 应用程序安全十分重要，即使是代码中很小的 bug 也有可能导致隐私信息被泄露

站点安全就是为保护站点不受未授权的访问、使用、修改和破坏而采取的行为或实践

我们常见的 Web 攻击方式有

- XSS (Cross Site Scripting) 跨站脚本攻击
- CSRF（Cross-site request forgery）跨站请求伪造
- SQL 注入攻击

## 二、XSS

代码注入
起因：没有对用户的输入进行严格的限制
结果：使得攻击者可以将脚本上传到帖子让其他人浏览到有恶意脚本的页面
方式：JavaScript、VBScript、CSS、Flash

XSS，跨站脚本攻击，允许攻击者将恶意代码植入到提供给其它用户使用的页面中

`XSS`涉及到三方，即攻击者、客户端与`Web`应用

`XSS`的攻击目标是为了盗取存储在客户端的`cookie`或者其他网站用于识别客户端身份的敏感信息。一旦获取到合法用户的信息后，攻击者甚至可以假冒合法用户与网站进行交互

举个例子：

一个搜索页面，根据`url`参数决定关键词的内容

```html
<input type="text" value="<%= getParameter("keyword") %>">
<button>搜索</button>
<div>您搜索的关键词是：<%= getParameter("keyword") %></div>
```

这里看似并没有问题，但是如果不按套路出牌呢？

用户输入`"><script>alert('XSS');</script>`，拼接到 HTML 中返回给浏览器。形成了如下的 HTML：

```html
<input type="text" value="" />
<script>
  alert("XSS");
</script>
">
<button>搜索</button>
<div>
  您搜索的关键词是：">
  <script>
    alert("XSS");
  </script>
</div>
```

浏览器无法分辨出 `<script>alert('XSS');</script>` 是恶意代码，因而将其执行，试想一下，如果是获取`cookie`发送对黑客服务器呢？

根据攻击的来源，`XSS`攻击可以分成：

- 存储型
- 反射型
- DOM 型

### 存储型

存储型 XSS 的攻击步骤：

1. 攻击者将恶意代码提交到目标网站的数据库中
2. 用户打开目标网站时，网站服务端将恶意代码从数据库取出，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

这种攻击常见于带有用户保存数据的网站功能，如论坛发帖、商品评论、用户私信等

### 反射型 XSS

反射型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中取出，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

反射型 XSS 跟存储型 XSS 的区别是：存储型 XSS 的恶意代码存在数据库里，反射型 XSS 的恶意代码存在 URL 里。

反射型 XSS 漏洞常见于通过 URL 传递参数的功能，如网站搜索、跳转等。

由于需要用户主动打开恶意的 URL 才能生效，攻击者往往会结合多种手段诱导用户点击。

POST 的内容也可以触发反射型 XSS，只不过其触发条件比较苛刻（需要构造表单提交页面，并引导用户点击），所以非常少见

### DOM 型 XSS

DOM 型 XSS 的攻击步骤：

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞

### XSS 的预防

通过前面介绍，看到`XSS`攻击的两大要素：

- 攻击者提交而恶意代码
- 浏览器执行恶意代码

针对第一个要素，我们在用户输入的过程中，过滤掉用户输入的恶劣代码，然后提交给后端，但是如果攻击者绕开前端请求，直接构造请求就不能预防了

而如果在后端写入数据库前，对输入进行过滤，然后把内容给前端，但是这个内容在不同地方就会有不同显示

例如：

一个正常的用户输入了 `5 < 7` 这个内容，在写入数据库前，被转义，变成了 `5 < 7`

在客户端中，一旦经过了 `escapeHTML()`，客户端显示的内容就变成了乱码( `5 < 7` )

在前端中，不同的位置所需的编码也不同。

- 当 `5 < 7` 作为 HTML 拼接页面时，可以正常显示：

```html
<div title="comment">5 &lt; 7</div>
```

- 当 `5 < 7` 通过 Ajax 返回，然后赋值给 JavaScript 的变量时，前端得到的字符串就是转义后的字符。这个内容不能直接用于 Vue 等模板的展示，也不能直接用于内容长度计算。不能用于标题、alert 等

可以看到，过滤并非可靠的，下面就要通过防止浏览器执行恶意代码：

在使用 `.innerHTML`、`.outerHTML`、`document.write()` 时要特别小心，不要把不可信的数据作为 HTML 插到页面上，而应尽量使用 `.textContent`、`.setAttribute()` 等

如果用 `Vue/React` 技术栈，并且不使用 `v-html`/`dangerouslySetInnerHTML` 功能，就在前端 `render` 阶段避免 `innerHTML`、`outerHTML` 的 XSS 隐患

DOM 中的内联事件监听器，如 `location`、`onclick`、`onerror`、`onload`、`onmouseover` 等，`<a>` 标签的 `href` 属性，JavaScript 的 `eval()`、`setTimeout()`、`setInterval()` 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免

```js
<!-- 链接内包含恶意代码 -->
< a href=" ">1</ a>

<script>
// setTimeout()/setInterval() 中调用恶意代码
setTimeout("UNTRUSTED")
setInterval("UNTRUSTED")

// location 调用恶意代码
location.href = 'UNTRUSTED'

// eval() 中调用恶意代码
eval("UNTRUSTED")
```

#### 预防存储型和反射型 XSS 攻击

服务端去除恶意代码后，插入到响应 HTML 里，攻击者可以编写的’数据‘被内嵌到’代码‘中，被浏览器锁执行

1. 改成纯前端渲染，把代码和数据分隔开
2. 对 HTML 做充分转义

#### 预防 DOM 型 XSS 攻击

实际上是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当做代码执行了。
把字符串作为代码运行的 api，很容易产生安全隐患

.innerHTML 、 .outerHTML 、 document.write() --->.textContent 、 .setAttribute()
vue：v-html / dangerouslySetInnerHTML

DOM 中的内联事件监听器，如 location 、 onclick 、 onerror 、 onload 、 onmouseover 等， <a> 标签的 href 属 性，JavaScript 的 eval() 、 setTimeout() 、 setInterval() 等，

#### 其他 XSS 防范措施

##### Content Security Policy

- 禁止加载外域代码，防止复杂的攻击逻辑
- 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域
- 禁止内联脚本执行
- 禁止未授权的脚本执行
- 合理使用上报可以及时发现 XSS，利于尽快修复问题

##### 输入内容长度控制

对于不受信任的输⼊，都应该限定⼀个合理的⻓度。虽然⽆法完全防⽌ XSS 发⽣，但可以增加 XSS 攻击的难度

##### 其它安全措施

- HTTP-only Cookie: 禁⽌ JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注⼊后也⽆法窃取此 Cookie。
- 验证码：防⽌脚本冒充⽤户提交危险操作。-

## 三、CSRF

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求

利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目

一个典型的 CSRF 攻击有着如下的流程：

- 受害者登录 a.com，并保留了登录凭证（Cookie）
- 攻击者引诱受害者访问了 b.com
- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带 a.com 的 Cookie
- a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求
- a.com 以受害者的名义执行了 act=xx
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作

`csrf`可以通过`get`请求，即通过访问`img`的页面后，浏览器自动访问目标地址，发送请求

同样，也可以设置一个自动提交的表单发送`post`请求，如下：

```js
<form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script>
```

访问该页面后，表单会自动提交，相当于模拟用户完成了一次`POST`操作

还有一种为使用`a`标签的，需要用户点击链接才会触发

访问该页面后，表单会自动提交，相当于模拟用户完成了一次 POST 操作

```html
< a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker"
taget="_blank"> 重磅消息！！ <a />
```

### CSRF 的特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生
- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”
- 跨站请求可以用各种方式：图片 URL、超链接、CORS、Form 提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪

### CSRF 的预防

CSRF 通常从第三方网站发起，被攻击的网站无法防止攻击发生，只能通过增强自己网站针对 CSRF 的防护能力来提升安全性

防止`csrf`常用方案如下：

- 阻止不明外域的访问
  - 同源检测
  - Samesite Cookie
- 提交时要求附加本域才能获取的信息
  - CSRF Token
  - 双重 Cookie 验证

这里主要讲讲`token`这种形式，流程如下：

- 用户打开页面的时候，服务器需要给这个用户生成一个 Token
- 对于 GET 请求，Token 将附在请求地址之后。对于 POST 请求来说，要在 form 的最后加上

```html
<input type="”hidden”" name="”csrftoken”" value="”tokenvalue”" />
```

- 当用户从客户端得到了 Token，再次提交给服务器的时候，服务器需要判断 Token 的有效性

## 四、SQL 注入

Sql 注入攻击，是通过将恶意的 `Sql `查询或添加语句插入到应用的输入参数中，再在后台 `Sql `服务器上解析执行进行的攻击

![](https://static.vue-js.com/ead52fa0-8d1d-11eb-85f6-6fac77c0c9b3.png)

流程如下所示：

- 找出 SQL 漏洞的注入点

- 判断数据库的类型以及版本
- 猜解用户名和密码
- 利用工具查找 Web 后台管理入口
- 入侵和破坏

预防方式如下：

- 严格检查输入变量的类型和格式
- 过滤和转义特殊字符
- 对访问数据库的 Web 应用程序采用 Web 应用防火墙

上述只是列举了常见的`web`攻击方式，实际开发过程中还会遇到很多安全问题，对于这些问题， 切记不可忽视

### iframe 滥用

iframe 是第三方提供的，默认情况下不受我们控制，攻击者可以在 iframe 中运行 JavaScript 脚本、Flash 插件、弹出对话框等，可能会破坏前端用户体验

## 参考文献

- https://tech.meituan.com/2018/09/27/fe-security.html
- https://developer.mozilla.org/zh-CN/docs/learn/Server-side/First_steps/Website_security

# 前端安全问题

## 概况

### 跨站脚本（XSS）

代码注入
起因：没有对用户的输入进行严格的限制
结果：使得攻击者可以将脚本上传到帖子让其他人浏览到有恶意脚本的页面
方式：JavaScript、VBScript、CSS、Flash

### iframe 滥用

iframe 是第三方提供的，默认情况下不受我们控制，攻击者可以在 iframe 中运行 JavaScript 脚本、Flash 插件、弹出对话框等，可能会破坏前端用户体验

### 跨站点请求伪造（CSRF）

攻击者通过设置好的陷阱，强制对已完成认证的用户进行非预期的个人信息或设定信息等某些状态更新

### 恶意第三方库

前端应用和后端服务器应用都会借助第三方库进行快速开发，一旦第三方库被植入恶意代码很容易引起安全问题

## XSS

### 分类： 存储型、反射型、DOM 型

#### 存储型 XSS 攻击步骤

1. 攻击者将恶意代码提交到目标网站的数据库中
2. 用户打开目标网站时，网站服务端将恶意代码从数据库去除，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

常见于带有用户保存数据的网站功能，如：论坛发帖、商品评论、用户私信

#### 反射型 XSS 攻击步骤

1. 攻击者构造出特殊 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL 时，网站服务端将恶意代码从 URL 中去除，拼接在 HTML 中返回给浏览器
3. 用户浏览器接收到响应后解析执行，混在其中的恶意代码也被执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

常见于通过 URL 传递参数的功能，如网站搜索、跳转等

#### DOM 型 XSS 攻击步骤

1. 攻击者构造出特殊的 URL，其中包含恶意代码
2. 用户打开带有恶意代码的 URL
3. 用户浏览器接收到响应后解析执行，前端 JavaScript 取出 URL 中的恶意代码并执行
4. 恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作

#### 反射型 XSS、存储型 XSS 和 DOM 型 XSS 的区别：

存储型 XSS 的恶意代码存在数据库
反射型 XSS 的恶意代码存在 URL 里
DOM 型 XSS 攻击，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞

### 预防

攻击的两大因素：

1. 攻击者提交恶意代码
2. 浏览器执行恶意代码

针对第一个要素：输⼊侧过滤能够在某些情况下解决特定的 XSS 问题，但会引⼊很⼤的不确定性和乱码问题

针对第二个要素：

1. 防止 HTML 中出现注入
2. 防止 JavaScript 执行时，执行恶意代码

#### 预防存储型和反射型 XSS 攻击

服务端去除恶意代码后，插入到响应 HTML 里，攻击者可以编写的’数据‘被内嵌到’代码‘中，被浏览器锁执行

1. 改成纯前端渲染，把代码和数据分隔开
2. 对 HTML 做充分转义

#### 预防 DOM 型 XSS 攻击

实际上是网站前端 JavaScript 代码本身不够严谨，把不可信的数据当做代码执行了。
把字符串作为代码运行的 api，很容易产生安全隐患

.innerHTML 、 .outerHTML 、 document.write() --->.textContent 、 .setAttribute()
vue：v-html / dangerouslySetInnerHTML

DOM 中的内联事件监听器，如 location 、 onclick 、 onerror 、 onload 、 onmouseover 等， <a> 标签的 href 属 性，JavaScript 的 eval() 、 setTimeout() 、 setInterval() 等，

#### 其他 XSS 防范措施

##### Content Security Policy

- 禁止加载外域代码，防止复杂的攻击逻辑
- 禁止外域提交，网站被攻击后，用户的数据不会泄露到外域
- 禁止内联脚本执行
- 禁止未授权的脚本执行
- 合理使用上报可以及时发现 XSS，利于尽快修复问题

##### 输入内容长度控制

对于不受信任的输⼊，都应该限定⼀个合理的⻓度。虽然⽆法完全防⽌ XSS 发⽣，但可以增加 XSS 攻击的难度

##### 其它安全措施

- HTTP-only Cookie: 禁⽌ JavaScript 读取某些敏感 Cookie，攻击者完成 XSS 注⼊后也⽆法窃取此 Cookie。
- 验证码：防⽌脚本冒充⽤户提交危险操作。-

## CSRF 跨站请求伪造

攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

CSRF 攻击流程：

1. 受害者登录 a.com ，并保留了登录凭证（Cookie）
2. 攻击者引诱受害者访问了 b.com
3. b.com 向 a.com 发送了⼀个请求： a.com/act=xx 浏览器会默认携带 a.com 的 Cookie
4. a.com 接收到请求后，对请求进⾏验证，并确认是受害者的凭证，误以为是受害者⾃⼰发送的请求
5. a.com 以受害者的名义执⾏了 act=xx
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执⾏了⾃⼰定义的操作

### 分类

#### GET 类型的 CSRF

GET 类型的 CSRF 利⽤⾮常简单，只需要⼀个 HTTP 请求

#### POST 类型的 CSRF

这种类型的 CSRF 利⽤起来通常使⽤的是⼀个⾃动提交的表单

#### 链接类型的 CSRF

这种类型通常是在论坛中发布的图⽚中嵌⼊恶意链接，或者以⼴告的形式诱导⽤户中招，攻击者通常会以⽐较夸张的词语诱骗⽤户点击

### 预防 CSRF

CSRF 的两个特点：

1.  CSRF（通常）发⽣在第三⽅域名。
2.  CSRF 攻击者不能获取到 Cookie 等信息，只是使⽤。

阻⽌不明外域的访问

- 同源检测：
- Samesite Cookie

提交时要求附加本域才能获取的信息

- CSRF Token
- 双重 Cookie 验证

#### 同源检测

1.  使⽤ Origin Header 确定来源域名: 在部分与 CSRF 有关的请求中，请求的 Header 中会携带 Origin 字段,如果 Origin 存 在，那么直接使⽤ Origin 中的字段确认来源域名就可以
2.  使⽤ Referer Header 确定来源域名: 根据 HTTP 协议，在 HTTP 头中有⼀个字段叫 Referer，记录了该 HTTP 请求的来 源地址

#### CSRF Token

CSRF Token 的防护策略分为三个步骤：

1. 将 CSRF Token 输出到⻚⾯中
2. ⻚⾯提交的请求携带这个 Token
3. 服务器验证 Token 是否正确

#### 双重 Cookie 验证

双重 Cookie 采⽤以下流程：

1. 在⽤户访问⽹站⻚⾯时，向请求域名注⼊⼀个 Cookie，内容为随机字符串（例如 csrfcookie=v8g9e4ksfhw ）。
2. 在前端向后端发起请求时，取出 Cookie，并添加到 URL 的参数中（接上例 POST https://www.a.com/comment? csrfcookie=v8g9e4ksfhw ）。
3. 后端接⼝验证 Cookie 中的字段与 URL 参数中的字段是否⼀致，不⼀致则拒绝。

#### Samesite Cookie 属性

Google 起草了⼀份草案来改进 HTTP 协议，那就是为 Set-Cookie 响应头新增 Samesite 属性，它⽤来标明这个 Cookie 是 个“同站 Cookie”，同站 Cookie 只能作为第⼀⽅ Cookie，不能作为第三⽅ Cookie，Samesite 有两个属性值:

1. Samesite=Strict: 这种称为严格模式，表明这个 Cookie 在任何情况下都不可能作为第三⽅ Cookie
2. Samesite=Lax: 这种称为宽松模式，⽐ Strict 放宽了点限制,假如这个请求是这种请求且同时是个 GET 请求，则这个 Cookie 可以作为第三⽅ Cookie

## 网络劫持

### 分类

#### DNS 劫持(输⼊京东被强制跳转到淘宝这就属于 dns 劫持)

DNS 强制解析: 通过修改运营商的本地 DNS 记录，来引导⽤户流量到缓存服务器
302 跳转的⽅式: 通过监控⽹络出⼝的流量，分析判断哪些内容是可以进⾏劫持处理的,再对劫持的内存发起 302 跳转的回复，引导⽤户获取内容

#### HTTP 劫持(访问⾕歌但是⼀直有贪玩蓝⽉的⼴告)

由于 http 明⽂传输,运营商会修改你的 http 响应内容(即加⼴告

### 如何应对⽹络劫持?

DNS 劫持由于涉嫌违法,已经被监管起来,现在很少会有 DNS 劫持,⽽ http 劫持依然⾮常盛⾏.
全站 HTTPS,将 HTTP 加密,这使得运营商⽆法获取明⽂,就⽆法劫持你的响应内容.

## 中间⼈攻击

1. 客户端发送请求到服务端，请求被中间⼈截获
2. 服务器向客户端发送公钥
3. 中间⼈截获公钥，保留在⾃⼰⼿上。然后⾃⼰⽣成⼀个【伪造的】公钥，发给客户端
4. 客户端收到伪造的公钥后，⽣成加密 hash 值发给服务器
5. 中间⼈获得加密 hash 值，⽤⾃⼰的私钥解密获得真秘钥,同时⽣成假的加密 hash 值，发给服务器
6. 服务器⽤私钥解密获得假密钥,然后加密数据传输给客户端
