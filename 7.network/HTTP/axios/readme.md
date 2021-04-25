# what

基于promise的HTTP库，可以用在浏览器和node.js中

特性
  从浏览器中创建XMLHttpRequests
  从node js创建http请求
  支持Promise API
  拦截请求和响应
  转换请求数据和响应数据
  取消请求
  自动转换JSON数据
  客户端支持防御XSRF
# how

## 封装请求方法

### 1、创建axios实例

```javascript
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 1000 * 60 * 10 // 请求超时时间
})
```
### 2、拦截器
1、请求前做什么
    header中添加token
    取消请求方法--- 
      A--->B 页面跳转时，应取消A页面的数据请求
      如果是上传大文件时，不想上传了，应当可以取消上传的数据请求

    ```javascript
    // request拦截器
service.interceptors.request.use(
  config => {
    if (getAuthorization()) {
      config.headers['Authorization'] = getAuthorization() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // 取消请求通过store 进行设置
    store.dispatch('InitSourc')
    config.cancelToken = store.getters.source.token  // 取消请求
    return config
  },
  error => {
    Promise.reject(error)
  }
)
```

2、请求之后做什么

   请求回来进行错误处理 / 授权失败 跳转至登录页 

   ```javascript
   // respone拦截器
service.interceptors.response.use(
  response => {
    if (response.data.err_code === 1001) {
      removeAuthorization()
      router.push({name: 'login'})
    }
    return response.data
  },
  error => {
    let err = ''
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          err = '错误请求'
          break
        // ... 等一系列错误
        default:
          err = `连接错误${error.response.status}`
      }
    } else {
      err = false
    }
    return Promise.reject(err)
  }
)
```
### 3、取消请求

写在store中

```javascript
state: {
    source: {
      token: null,
      cancel: null
    },
  },

getters: {
  source: state => {
    return state.source
  }

mutations: {
    INIT_SOURCE: (state) => {
      const CancelToken = axios.CancelToken
      state.source = CancelToken.source()
    },
    CUTDOWN_SOURCE: (state) => {
      if (state.source.cancel) {
        state.source.cancel('Operation canceled by the user.')
        message.destroy()
      }
    }
}

actions: {
  InitSourc({
    commit
  }) {
    commit('INIT_SOURCE')
  },
  StopSouce({
    commit
  }) {
    commit('CUTDOWN_SOURCE')
  },
}
```


使用：

在请求拦截中注入取消请求

路由拦截和取消上传 调用

```javascript
store.dispatch('StopSouce')
```
# why


原理： 内部对XMLHttpRequest 进行了封装

## XMLHttpRequest 对象

用于与服务器交互。

构造函数：
XMLHttpRequest()

属性：

XMLHttpRequest.onreadystatechange 当 readyState 属性发生变化时，调用

XMLHttpRequest.readyState 请求的状态码

XMLHttpRequest.response 响应实体

XMLHttpRequest.responseType  定义响应类型的枚举值 

XMLHttpRequest.responseURL  经过序列化的相应URL
 
XMLHttpRequest.responseXML  返回一个Document

XMLHttpRequest.status 请求的响应状态

XMLHttpRequest.statusText  "200 OK"

XMLHttpRequest.timeout  最大请求时间 超时

XMLHttpRequestEventTarget.ontimeout 请求超时时调用

XMLHttpRequest.upload 上传进度

XMLHttpRequest.withCredentials 


方法：

XMLHttpRequest.abort() 中止请求

XMLHttpRequest.getAllResponseHeaders() 

XMLHttpRequest.getResponseHeader()

XMLHttpRequest.open() 初始化一个请求

XMLHttpRequest.overrideMimeType() 覆写由服务器返回的 MIME 类型。
 
XMLHttpRequest.send()  发送请求

XMLHttpRequest.setRequestHeader()

事件：

abort： 当request被停止时触发

error：当request错误时触发

load：请求成功完成时触发

loadend：当请求结束时触发

loadstart：接收到相应数据时触发

progress：当请求接收到更多数据时，周期性地触发

timeout： 在预设时间内没有接收到响应时触发。

## Axios原理

###  