# vue 的 diff 算法

## 概述

数据或 dom 修改时，只更新我们修改的那一小块 dom，而不是更新整个 dom

真实 DOM - virtual dom --- 改变生成新的 Vnode
Vnode 和 oldVnode 对比， 不一样的地方直接修改在真实 DOM 上

diff 过程：调用名为 patch 函数，比较新旧节点，一边比较一边给真实 DOM 打补丁

只会同层级比较，不会跨层级比较

diff 流程图

数据发生变化时，set 方法会让调用 Dep.notify 通知所有订阅者 Watcher，订阅者会调用 patch 给真实的 DOM 打补丁，更新相应视图

具体分析

pacth
接受两个参数，oldVnode 和 Vnode

- 判断两节点是否值得比较，值得比较则执行 patchVnode

```javascript
function sameVnode(a, b) {
  return (
    a.key === b.key && // key值
    a.tag === b.tag && // 标签名
    a.isComment === b.isComment && // 是否为注释节点
    // 是否都定义了data，data包含一些具体信息，例如onclick , style
    isDef(a.data) === isDef(b.data) &&
    sameInputType(a, b) // 当标签是<input>的时候，type必须相同
  )
}
```

- 不值得比较则用 Vnode 替换 oldVnode

patchVnode

```javascript
patchVnode (oldVnode, vnode) {
    const el = vnode.el = oldVnode.el
    let i, oldCh = oldVnode.children, ch = vnode.children
    if (oldVnode === vnode) return
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
        api.setTextContent(el, vnode.text)
    }else {
        updateEle(el, vnode, oldVnode)
    	if (oldCh && ch && oldCh !== ch) {
            updateChildren(el, oldCh, ch)
    	}else if (ch){
            createEle(vnode) //create el's children dom
    	}else if (oldCh){
            api.removeChildren(el)
    	}
    }
}

```

这个函数做的事情：

- 找到对应的真实 dom，成为 el
- 判断`Vnode`和`oldVnode`是否指向同一个对象，如果是，那么直接 return
- 如果他们都有文本节点并且不相等，那么将`el`的文本节点设置为`Vnode`的文本节点
- 如果`oldVnode`有子节点而`Vnode`没有，则删除`el`的子节点
- 如果`oldVnode`没有子节点而` Vnode`有，则将`Vnode`的子节点真实化后添加到`el`
- 如果两者都有子节点，则执行`updateChildren`函数比较子节点

updateChildren

```javascript
updateChildren (parentElm, oldCh, newCh) {
    let oldStartIdx = 0, newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx
    let idxInOld
    let elmToMove
    let before
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {   // 对于vnode.key的比较，会把oldVnode = null
            oldStartVnode = oldCh[++oldStartIdx]
        }else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx]
        }else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx]
        }else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        }else if (sameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        }else if (sameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        }else {
           // 使用key时的比较
            if (oldKeyToIdx === undefined) {
                oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
            }
            idxInOld = oldKeyToIdx[newStartVnode.key]
            if (!idxInOld) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                newStartVnode = newCh[++newStartIdx]
            }
            else {
                elmToMove = oldCh[idxInOld]
                if (elmToMove.sel !== newStartVnode.sel) {
                    api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
                }else {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[idxInOld] = null
                    api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
                }
                newStartVnode = newCh[++newStartIdx]
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
    }else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
}

```

- 将`Vnode`的子节点`Vch`和`oldVnode`的子节点`oldCh`提取出来
- `oldCh`和`vCh`各有两个头尾的变量`StartIdx`和`EndIdx`,它们 2 个变量相互比较，一共有 4 种比较方式。如果 4 中比较都没匹配，如果设置了`key`，就会使用`key`进行比较，在比较的过程中，变量会往中间靠，一旦`StartIdx>EndIdx`表明`oldCh`和`vCh`至少有一个已经遍历完了，就会结束

图解 updateChildren

现在分别对 oldS、oldE、S、E 两两做 sameVnode 比较，有四种比较方式，当其中两个能匹配上那么真实 dom 中的相应节点会移到 Vnode 相应的位置，这句话有点绕，打个比方

- 如果是 oldS 和 E 匹配上了，那么真实 dom 中的第一个节点会移到最后
- 如果是 oldE 和 S 匹配上了，那么真实 dom 中的最后一个节点会移到最前，匹配上的两个指针向中间移动
- 如果四种匹配没有一对是成功的，分为两种情况
  - 如果新旧子节点都存在 key，那么会根据 oldChild 的 key 生成一张 hash 表，用 S 的 key 与 hash 表做匹配，匹配成功就判断 S 和匹配节点是否为 sameNode，如果是，就在真实 dom 中将成功的节点移到最前面，否则，将 S 生成对应的节点插入到 dom 中对应的 oldS 位置，S 指针向中间移动，被匹配 old 中的节点置为 null。
  - 如果没有 key,则直接将 S 生成新的节点插入真实 DOM（ps：这下可以解释为什么 v-for 的时候需要设置 key 了，如果没有 key 那么就只会做四种匹配，就算指针中间有可复用的节点都不能被复用了）

oldS > oldE 表示 oldCh 先遍历完，那么就将多余的 vCh 根据 index 添加到 dom 中去（如上图）

S > E 表示 vCh 先遍历完，那么就在真实 dom 中将区间为[oldS, oldE]的多余节点删掉

层层递归下去，直到将 oldVnode 和 Vnode 中所有子节点对比完，也将 dom 的所有补丁都打好
