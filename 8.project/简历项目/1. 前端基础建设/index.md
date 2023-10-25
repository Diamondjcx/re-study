为统一项目技术栈，一致代码更好地管理复杂项目结构，促进代码复用和维护；开发数据后台脚手架、数据大屏初始化脚手架、标注画板工具、echarts 图表封装、check-version、websocket 插件等公共插件开发与维护；

1.  数据后台脚手架：包含公共功能，授权逻辑、飞书登录、菜单、公共逻辑，不用重新再搭建项目，vue3、vite、naive、echarts

    1. 授权登录：手机号验证码登录、账号密码登录、飞书登录 三种登录方式
    2. layout 布局 -- 上面 topbar（左边产品名字---使用了 vite 插件写的、右边用户名及退出功能、深色浅色、是否全屏）、左边菜单（可收缩）、右边内容

       1. 项目名字---使用 vite 插件编写，1. 实践插件编写 2.统一 vite 配置 name
       2. 深浅主题色--内部实现以及市面上常用的实现方式 比如哀悼时 首页变灰色
       3. 全屏技术
       4. 这里组件（全屏、主题、通知等）使用了异步组件 defineAsyncComponent 统一在 page-config 中进行配置 需要显示哪些模块

    3. 基础配置：
       1. tailwind.config.js
          为什么要使用，好处
       2. 格式化代码（eslint、prettier）
          为什么要使用，解决了什么痛点，好处
       3. vue-router
          1. 涉及组件命名及格式化
          2. addRoute 动态路由
          3. 路由守卫
          4. 路由懒加载
       4. pinia
          和 vuex 的区别，为什么要引入 pinia
       5. axios 封装
          封装了哪些
          1. request 方法（路径、过期时间）
          2. 请求拦截，假如 token
          3. 响应拦截，统一处理异常，如果 token 过期，直接跳转至登录页面，清空授权等逻辑数据
          4. 取消请求？？？
          5. axios 原理
       6. 环境配置（development、debug、test、production）
          可能会包含腾讯地图 key、飞书 code 等配置
    4. 公共组件 components
       ui 组件

       1. progress-bar 进度条
       2. logo
       3. icon
       4. 二次确认 confim
       5. check-versions 检查版本

       业务组件

       1. 导出 （点击导出 生成一条导出记录，在导出列表中查看进度及下载；点击导出、等待中 loading 一直走）
       2. 筛选

    5. hooks

       1. 分页加载公共逻辑

    6. vue plugins
       1. echarts
       2. icons
       3. fix-naive-ui-style（https://www.naiveui.com/zh-CN/os-theme/docs/style-conflict
       4. 指令（ input 过滤 %之类的过滤 不让输出
    7. tools
       1. is 是什么类型 Object.prototype.toString.call(obj)
       2. 是否为数组 Array.isArray(arr)
       3. 遍历对象过滤空值参数 格式化时间戳

2.  数据大屏 layout：每一套产品都包含一个数据大屏，数据大屏与设计稿适配问题，用百分比做的适配，太麻烦了，需要计算每一块的百分比，并且不可以百分百还原设计稿，用 scale 做的适配，按照设计稿的初始宽高，当屏幕缩小或增大时，layout 放大缩小，还原设计稿并且只需要按照设计稿的 px 值写样式即可。

    1. 适配布局问题
    2. 一张图如何在盒子里面做适配

3.  标注画板工具：产品需求很多都需要将识别结果以点、多边形将识别结果的坐标展示出来，加上交互，点击某一个品类，弹出对应品类的详细信息，以及需要对图进行标注，比如对门店餐桌标注，将餐桌标出来，roi、等 canvas 及 js 基础应用
    场景一：将识别结果坐标在图上面展示出来、然后点击某一个矩形要显示详细信息（涉及坐标上传、坐标对应 index
    场景二：在图上画形状多边形或点线（闭合不闭合的区别）将坐标上传保存，标注桌子、标注 roi、起跑线等 点线

    1. 标注画板 canvas api / 动画 画路径 闭合或非闭合

    2. 标注 svg api / 动画

       vue3 svg 标注绘画插件
       svg 知识点 path、circle

    3. 功能及思路

4.  check-version：产品更新至线上之后，为了让用户实时感知版本功能有更新，和 vue 官网那样 弹框提示给用户；实现此功能有\*\*\*

    1. 功能思路实现
    2. 拓展调研

5.  websocket-plugin：产品有很多 websocket 推送功能，实时推送门店进店人数，推送坐标等等，有**_功能，遇到了_**坑

    1. 有什么功能
       功能：产品中有很多 websocket 推送功能，每一个项目写一套很麻烦，所以封装了一个推送插件；创建 WebSocket 实例，初始化实例方法 onopen、onclose、onerror、onmessage、重连机制、发送心跳包给后端、获取推送数据回调函、关闭连接等

    2. 实现思路

       主要思路及知识点：
       使用：创建实例对像、传入参数，url、获取推送后数据回调函数，关闭链接、获取到推送数据、
       踩坑：连接错误（非手动关闭、网络断开）重新连接、发生错误之后（服务端错误）重新连接 时 推送的数据没有显示在页面，排查错误 发生错误重连之后没有做数据处理，通过传入回调函数进行处理接收

6.  common-tools

    1. img2base64:图片转 base64
    2. 格式化数字：保留小数、千分位符号
    3. 获取 query 参数
    4. reg：手机号、邮箱、身份证、url 地址、name、序列号、账号设备 ip
    5. system：

       是否是移动端
       是否为移动端微信客户端
       是否为企业微信

7.  echarts 图表封装

8.  通用组件封装 思路
9.  npm 私服

10. git

11. 产品冗余

    1. 省市区数据结构设计不合理 省市区数据及传参不对应，页面经过大量的数据处理运算 麻烦，不清晰，不好维护
    2. 数据定义不合理，很多常量定义在前后端，一旦有修改的时候，双方都需要修改，增加工作量，浪费时间，不好维护（比如一些算法要修改命名
    3. 交互上不合理，

12. 基础工作

    1. 引入代码格式化，人员增多，格式化不一样，提交之后会有大量的修改，不统一
    2. 统一移动端交互，比如统一筛选，弹框进行平铺筛选项，一目了然
    3. echarts 图表接口 数据 商讨统一数据结构
    4. 接口文档 统一规范
    5. 项目工程
    6. 编写一些文档

       1. 前端工程规范
       2. 前端输入规范
       3. 命名规范
       4. git 提交规范
       5. 调试 charles、h5
       6. 踩坑整理
       7. 测试经常容易出的问题整理

13. 公共组件封装

         props 传值
         provide/inject
         defineExpose 出去什么方法 ref 进行调用
         emit 出去什么
         slot
         如何用？

    1.  返回 左上角返回按钮（样式、文案、事件通用 写在组件中）
    2.  tab 组、样式一样，vant 没有这样的样式，div 重新写的（当天、近 7 天、近 30 天/省市门店/）

        props:

             options（项）
             value（当前选中的值，1.设置当前选中值 2. 设置当前选中样式）

        method：

             通过props拿值，改变之后再emit，update.value到父组件修改值

    3.  日历组件，vant 实现不了业务中的时间选择器，

        1.  快捷选择 近 7 天、近 1 个月、近 3 个月
        2.  开始时间、结束时间
        3.  日期选择器

        props：

                     defaultDr：默认选择的值

        method：

                     emit。confirm 将选择的开始时间和结束时间传递给父组件

    4.  card 卡片组件 内容有 数值、上升、下降、持平 icon、算法未开启（门店没有营业的时候，算法未开启）
        porps：data
        method：cardItemClick
    5.  tipAlg 算法未开启 展示组件
    6.  chart 类

        1. echarts 按需加载，以 vue-plugin 方式注入到系统中

        ```js
        export default {
          install: (app, options) => {
            app.provide("$echarts", echarts);
          },
        };
        ```

        2. provide 和 inject
        3. slot 插槽
        4. 引入多个 json

        ```js
        const map_json = import.meta.glob("@/assets/mapJson/*.json");
        ```

        地图（全国地图及下钻到省地图）
        table

        line

               chartData\attr\chart-config\style

        pie

        bar
        wrap（左边图表，右边表格）

             slot
             spanCol

    7.  checkbox 全选 div 全选功能
        props：value、allCheck
        update.value
    8.  check-version
        props：version、versionList

        ```js
        checkVersion({
          auto_refresh: false,
          delay: 1000 * 20,
          success: (url) => {
            visible.value = true;

            _url.value = url;
          },
          fail: (url) => {
            // console.log(url);
          },
          error: () => {
            // consosle.log('error')
          },
        });
        ```

    9.  empty 没有更多了 img
    10. filter
        date 筛选
        dateRange 当天/近 7 天/近 30 天
        lineOption
        provice
        selectFilter
    11. link 跳转
    12. navbar
    13. select
        city
        peopleAttr
        popup
        store
    14. tabbar
    15. table

               功能有
               表头（有排序
               内容（有加载条）

               header

               columns
               title
               key
               type
               width
               style
               sort


               循环columns
               有样式的，添加进去
               有点击事件的 添加点击事件（排序
               有排序的 要渲染排序（icon、选中样式）

               content
               columns
               data
               maxHeight

               拿到数据之后先进行处理，和key绑定，循环数据，
               计算样式width click等


               progress进度值
               值/max  给width设置百分比


               问题：行内样式需要写tools 转化成vw
               (num / 375) * 100 + 'vw'

    16. title
