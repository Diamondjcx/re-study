const babel = require('@babel/core')

// babel-loader   : test:/\.[tj]sx?/

const code = `
async function Async1() {
  await fetch();
}

async function Async2() {
  const { data } = await fetch();
  
  
  return data;
}

const Async3 = async function () {
  const { code } = await fetch();
  return code;
}
`

console.log(babel.transform(code).code);