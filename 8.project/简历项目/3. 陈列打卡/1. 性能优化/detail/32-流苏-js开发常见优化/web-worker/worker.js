function  count(num) {
	return new Array(num).fill(0).map((item, index) => index).reduce((res,next) => {
		res +=next
		return res
	}, 0)
}

self.onmessage = e => {
	console.log(e, e.data, count(e.data))
	self.postMessage(count(parseInt(e.data)))
	closeSon()
}

// setTimeout非必须，此处模拟，worker干了个耗时的活，2s后告诉主线程（老板）活已经干完ok了。
// setTimeout(() => {
// 	// 发送信息给主线程
//
// 	closeSon()
// }, 2000)

// 关闭worker线程
function closeSon () {
	return self.close()
}

