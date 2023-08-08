const babel = require('@babel/core')

const code = `
  const square = x => x ** 2;
  const sum = a => a + 2;
  const list = 5 |> square(^^) |> sum(^^);
`;

/* const ast = babel.parse(code, {
  sourceType: 'module',
}); */

console.log(babel.transform(code).code);