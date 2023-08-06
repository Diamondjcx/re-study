const esprima = require('esprima');

var program = 'const answer = 42';

const token = esprima.tokenize(program);

console.log(token)

const ast = esprima.parse(program);

console.log(JSON.stringify(ast, null, '  '));