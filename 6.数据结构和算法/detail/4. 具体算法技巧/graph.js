// 图 与 图算法
// 构成：边集合 和 顶点集合
// 分类：有向图、无向图、构造图

// 试题 实现图类
class Graph {
    constructor(v) {
        this.vertices = v; // 顶点数
        this.edges = 0; // 边集合
        this.arr = [];
        // 初始化元素集合 => 多少个顶点就有多少个元素
        for(let i = 0; i < this.vertices; i++) {
            this.arr[i] = [];
        }
    }
    showGraph() {
        for (let i = 0; i < this.vertices; i ++) {
            let str = i + '->';
            for(let j = 0; j < this.vertices; j++) {
                if(this.arr[i][j] !== undefined) {
                    str += this.arr[i][j] + '';
                }
            }
        }
        console.log(str);
    }
    addEdge(v, w) {
        this.arr[v].push(w);
        this.arr[w].push(v);
        this.edges++;
    }
    // traverse() {}
}

// 图解决深度优先问题
// 起始点开始搜索，直到最终顶点 => 再返回追溯 => 没有路径

// 1. 结构化补充
constructor() {
    // super()
    this.marked = []; // 已经访问过的节点
    for(let i = 0; i < this.vertices; i++) {
        this.marked[i] = false;
    }
}

// 2. 深度优先开始
dfs(v) {
    this.marked[v] = true;
    if (this.arr[v] !== undefined) {
        console.log('visited' + v);
    }
    this.arr[v].forEach(w => {
        if(!this.marked[w]) {
            this.dfs(w);
        }
    })
}

// 3. 广度优先
// 1. 查找当前节点相邻的顶点，依次访问，由近及远
// 2. 取出下一个顶点，加入到marked已访问列表
// 3. 相邻未访问顶点添加到组织队列
bfs(s) {
    let queue = [];
    this.marked[s] = true;
    queue.push(s);
    while(queue.length > 0) {
        let v = queue.shift();

        if(v !== undefined) {
            console.log('visited' + v);
        }
        this.arr[v].forEach(w => {
            if (!this.marked[w]) {
                this.marked[w] = ture;
                queue.push(w);
            }
        })
    }
}

// 面试题 最短路径方法
// 利用广度优先天然查找路径的方式

// 1. 保存记录一个顶点到另一个顶点的所有边 - edgeTo
// 2. 每遇到一个未标记的顶点，除了标记，还需要从列表中添加边，从顶点连到当前顶点

constructor() {
    // super()
    this.edgeTo = [];
}

bfs(s) {
    let queue = [];
    this.marked[s] = true;
    queue.push(s);
    while(queue.length > 0) {
        let v = queue.shift();

        if(v !== undefined) {
            console.log('visited' + v);
        }
        this.arr[v].forEach(w => {
            if (!this.marked[w]) {
                this.marked[w] = ture;
                this.edgeTo[w] = v; // 做一个顶点连接记录
                queue.push(w);
            }
        })
    }
}

pathTo(t, v) {
    let source = t;
    
    // 检测
    for (let i = 0; i < this.vertices; i++) {
        this.marked[i] = false;
    }

    this.bfs(source);
    if (!this.marked[v]) {
        return undefined;
    }

    let path = [];
    let str = '';

    for(let i = v; i !== source; i = this.edgeTo[i]) {
        path.unshift(i);
    }
    path.unshift(source);

    for (let i in path) {
        if(i < path.length - 1) {
            str += path[i] + '->';
        } else {
            str += path[i];
        }
    }
    console.log(str);
    return path;
}

// %%%%%%%%%%%%%%%%%%%%%%%%
const g = new Graph(5);
g.addEdge(0, 1);
g.addEdge(0, 2);
// ……

g.pathTo(0, 4);

// 1. 图类 - 路径问题
// 2. 实现图类 - 边 + 顶点
// 3. 处理路径问题

