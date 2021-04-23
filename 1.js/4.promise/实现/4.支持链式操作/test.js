let Promise = require('./myPromise')

let fs = require('fs')

let promise = new Promise((resolve, reject) => {
  fs.readFile('./1.txt','utf8',(err, data) => {
    err ? reject(err): resolve(data)
  })  
})

function successLog (data) {
  console.log('success',data)
}

function errorLog (err) {
  console.log('err',err);
}

promise.then(successLog, errorLog)