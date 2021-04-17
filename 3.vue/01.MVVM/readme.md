# mvvm
vue实现数据双向绑定：数据劫持+发布订阅，通过Object.defineProperty来劫持各个属性的getter、setter，在数据变动的时候，发布消息给订阅者，触发相应的监听回调。

**(1)** 实现一个observer，通过Object.defineProperty来劫持各个属性的getter、setter
**(2)** 实现一个指令解析器compile，对每个元素的节点进行扫描和解析，根据指令模板替换数据，以及绑定对应的更新函数
**(3)** 实现一个watcher，作为observer和compile的桥梁，能够订阅每个属性变动的通知，执行指令绑定的相应的回调函数，从而更新视图
**(4)** mvvm入口函数