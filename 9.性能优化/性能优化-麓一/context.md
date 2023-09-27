## 0-10 背景

## 11-45 性能指标概念解释

    - 11-23  常规指标
    - 23-26  最新指标

## 26- 如何获取这些指标

    26-34 讲述
    34-01:11 代码举例
    ```js
    connectTime(TCP连接耗时): ${connectEnd - connectStart}
    ttfbTime: ${responseStart - requestStart}
    responseTime(Response响应耗时): ${responseEnd - responseStart}
    parseDOMTime(DOM 解析耗时): ${loadEventStart - domLoading}
    DCL: ${domContentLoadedEventEnd - domContentLoadedEventStart}
    TTI: ${domInteractive - fetchStart}
    loadTime: ${loadEventStart - fetchStart}
    ```

## 从什么维度来剖析性能

    01:11-01:40

    计算机维度
        缓存

## 例子 react

    01:40 - 01:47
