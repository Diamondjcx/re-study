console.log("Welcome luyi");

// LCP， FP， FCP
new PerformanceObserver((entryList, observer) => {
    let entries = entryList.getEntries();
    for(let i = 0; i < entries.length; i++) {
        if(entries[i].name === 'first-paint') {
            console.log(`FP: ${entries[i].startTime}ms`)
        }
        if(entries[i].name === 'first-contentful-paint') {
            console.log(`FCP: ${entries[i].startTime}ms`)
        }
    }
    observer.disconnect()

})
.observe({ entryTypes:['paint']});

new PerformanceObserver((entryList, observer) => {
    let entries = entryList.getEntries();
    const lastEntry = entries[entries.length -1];
    console.log(`LCP: ${lastEntry.startTime}`);
    observer.disconnect()
})
.observe({ entryTypes:['largest-contentful-paint']});

setTimeout(() => {
    const {
        fetchStart,
        connectEnd,
        connectStart,
        requestStart,
        responseStart,
        responseEnd,
        domLoading,
        domInteractive,
        domContentLoadedEventStart,
        domContentLoadedEventEnd,
        loadEventStart
    } = performance.timing;
    
    console.log(` 
    connectTime(TCP连接耗时): ${connectEnd - connectStart}
    ttfbTime: ${responseStart - requestStart}
    responseTime(Response响应耗时): ${responseEnd - responseStart}
    parseDOMTime(DOM 解析耗时): ${loadEventStart - domLoading}
    DCL: ${domContentLoadedEventEnd - domContentLoadedEventStart}
    TTI: ${domInteractive - fetchStart}
    loadTime: ${loadEventStart - fetchStart}    
    `)
},2000)