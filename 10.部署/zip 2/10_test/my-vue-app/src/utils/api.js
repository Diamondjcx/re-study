export const getDataTime = (cb) => {
    setTimeout(() => {
        cb(Math.random())
    }, 10000)
};

export const getDataList = () => {
    return new Promise((resolve, reject) => {
        resolve(Math.random())
    })
}