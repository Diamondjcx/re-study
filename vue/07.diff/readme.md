# vue 的 diff 算法

## 概述

数据或dom修改时，只更新我们修改的那一小块dom，而不是更新整个dom

真实DOM - virtual dom --- 改变生成新的Vnode
Vnode 和 oldVnode 对比， 不一样的地方直接修改在真实DOM上

diff过程：调用名为patch函数，比较新旧节点，一边比较一边给真实DOM打补丁
