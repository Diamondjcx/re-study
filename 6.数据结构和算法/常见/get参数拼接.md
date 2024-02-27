```js
let params = new URLSearchParams();
params.append("param1", "value1");
params.append("param2", "value2");
params.append("param3", "value3");
let url = "http://example.com" + "?" + params.toString();
console.log(url); // 输出: http://example.com?param1=value1&param2=value2&param3=value3
```
