# 1. 面试流程详解

## 1.0 P6 轮数

阿里：5~6 轮，最后一面 HR（小心），前 5 轮技术面试，1 个月（电话面试）
腾讯：4~6 轮，3-4 轮技术面试，HR（轻松） 1 个月
百度：4~5 轮，1-3 轮技术面试，HR（轻松） 1-2 天
头条：4 轮，HR（轻松） 1 天， 给 1 周时间
美团：4 轮，一周结束战斗

## 1.1 P6 大致薪资

头条：30+k
阿里：30+k
百度：30k
腾讯：28k
快手：

## 1.2 面试的时候 1/2/3/4/5 面要侧重的点

1 面：CSS / 语法 / 框架 / 框架原理 / 性能优化 等
2 面：框架原理 / 网络安全 / 算法 / 项目设计&工程化 等
3 面：算法 / 项目设计&工程化 / 自己做过的项目经历 等
4 面：做过的项目经历 / 新系统的设计题等
5 面： 沟通能力 / 价值观 等

## 1.3 各公司的建议面试顺序

阿里 -> 腾讯 -> 百度 -> （滴滴） -> 头条 -> 快手 -> 美团

## 1.5 职级

阿里：p6
腾讯：2-3 ~ 3-1
百度：T5 ~ T6
滴滴：D6 ~ D7
头条：2-1

# 2.简历

## 2.1 简历格式与重点

1. 学历 + 经历
2. 做过的技术性质的自我产出
3. 2017-2018 ××××× 项目
   用到了 ××××× 技术，负责了 ×××××，webpack（写过一个 ××××× 插件）功能
4. 技能可以往下放放
5. 个人爱好（可以不写）
   篇幅：尽量不要超过 2 篇

个人项目：
使用 vue 开发过一个开源 UI 库
https://github/×××××
（设计 公共组件）

项目：
××××× 系统
使用了 ××××× 框架，并自己增加了 loader/plugin/中间件封装了 ××××× 功能

技能介绍：

个人介绍：

# 3.前端从业类型

## 3.0 PC 开发（TO B / TO C 数量减少 / 数据图表 / 内部系统 / 工程效率 - 中台）

## 3.1 H5 页面开发（TO C 减少）

## 3.2 小程序 / 公众号

## 3.3 纯技术（核心团队做框架 week/ 微信 SDK）

## 3.4 融合开发（包括不但限于 hybird / rn / nw.js / electron）发版本（过 ios 审核、版本残留、定时上线）

## 3.5 node.js

# 4. 需要的技能（功利）

## 4.0 基础： CSS / 正则 / BOM / DOM / (闭包 / this) / 节流去抖 / 数组方法 （必备）

## 4.1 语言： ES6 / TS / 各类 DSL （必备）

Promise(背)
async/await / const -> babel -> 产出
proxy -> babel -> defineProperty []依然代理不了
TS -> 重载 vue3.0 泛型

## 4.2 框架：React / Vue / Angular （必备）

4.2.1 用法篇：HOC(@decorators) / render-props / 生命周期
4.2.2：VUE 双向绑定（definePrototype get set ... / pop / push）
4.2.3：vue/react vdom:DFS 复杂度（手写一个简单）
diff(oldVnode, newVnode) {
patch()
}
4.2.4: 路由：vue-router， react-router（hash\ pushState ）onpopstate / onhasnchange
4.2.5:数据流框架： redux / mobx / vuex（希望能手写）
4.2.6： react - fiber 架构的实现 - 实现
4.2.7： 跨端框架（weex / uniapp）

## 4.3 服务端： Node.js / 中间件（必备）

4.3.1 （登录、存储、并发、缓存 抽奖 - redis），中间件（尝试抽离一下）

## 4.4 融合开发： Hybrid / React-Native / 小程序 / nw / eletron

4.4.1 Hybrid
jsbridge -> ios 几种实现方式、 android 几种实现方式
小程序 -> Hybrid ->js & 客户端 setData prompt / postMessage / jsbingding /

    封装sdk底层看
    wx.getLocation = (...args) => {
      callMethod(...args);
    }
    callMethod() {
      wondow.messageHandler.××××.call('asdasd')
      }

4.4.3 RN/小程序 渲染逻辑
渲染层 -> 逻辑 js 不在一起

## 4.5 工程化： ×××-cli / webpack / eslint / NPM / 单侧 / 流水线 （强行准备）（必备）

前端工程化 -> webpack -> loader/plugin 规约一些通用的小功能
NPM -> package.json
github.com/yuanxin-alibaba/course

## 4.6 基础技能： 设计模式 / 算法 / 性能优化 / 网络（必备）

网络：
http: 缓存系列
'Cache-Control', 'expire' --- 200 （在客户端拦死）
`Etag` + 'last-modify' ---304 （会向服务端发起）
200 + 304 = hash
cookies:cookies / set-cookie
location
transfer-encoding: bigpipe

4.6.1 性能优化
react.memo ->react-router
（动态 lazy 加载组件的技术）code split react.lazy / 动态组件
SSR 用得少（降级）（在检查到某一个 QPS 量级时，退化为普通的前端）

算法： POJ
动态规划
背包

```js
const dp = arr => {
  let res = [].concat(arr);
  let arrLen = arr.length;
  for (let i = 0; i< arrLen; i++>) {
    for (let j = 0; j < arrLen; j++) {
      if (arr[i] (> 或 <) arr[i-j] + ×××××) {
        arr[i] = 重新赋值；
      }
    }
  }
}
```

搜索算法
dfs

```js
const dfs = arr => {
  if (shot(××××)) {
    return ×××;
  }
  if (judge(×××)) {
    dfs();
  }
}
```

```js
const bfs = () => {
  while (queueu.length) {
    const point = queueu.shift()
    for (可达 in point) {
      queueu.push(point)
      if (shot(可达)) {
        return 可达
      }
    }
  }
}
```

排序

## 4.7 图形： SVG / Canvas（非必备）

===========================================

## 4.8 软技能： 技术方案 / 文档 / 调研 / 推动能力（非必备）

文档 -> 特别重要，大企业内部

## 4.9 编码能力： 风格与最佳实践，如函数式等（面试时不一定会体现，工作中绝对能体现）

函数式 -> 纯函数 / 全局 || 局部变量

# 6 创新与自驱动的产出

## 6.1 我们需要准备好一些自我的项目

    1)准备一些好的×××-loader，或者×××库（比较适合做中台类型的项目）
    2) 准备一些runtime的插件，比如做一个UBB的js-parser，还能兼容时髦的rn / flutter / 小程序等
    wordpress -> blog 语言
    3) 多学一些非js的东西， 比如shell / php等
    4) 做一些中间件，比如登录业务 / 内部的业务的RPC调用或特殊格式解析



Webpack 写一个 markdown loader
https://juejin.cn/post/6954598853593169951


loader 与plugin
https://github.com/yuanxin-alibaba/course

plugin
https://juejin.cn/post/6844904162405138445#heading-28


善于使用package.json中的自定义命令



vscode插件

sneak mark
https://github.com/hoc2019/vscode-sneak-mark