/* const babel = require('@babel/core');

const code = `
  import React from 'react';
  function add(a, b) {
    const decrease = () => {
      return c;
    }
    return a + b;
  }
  let str = 'hello';
`;

const CONSOLE_AST = babel.template.ast(`console.log('函数执行完成');`);

const ast = babel.parse(code, {
  sourceType: 'module'
});

babel.traverse(ast, {
  ReturnStatement(path) {
    path.insertBefore(CONSOLE_AST);
    console.log(path)
  }
});

console.log(babel.transformFromAstSync(ast).code); */

const t = require('@babel/types');
const generate = require('@babel/generator').default;

const CONSOLE_AST = t.expressionStatement(
  t.callExpression(
    t.memberExpression(
      t.identifier('console'),
      t.identifier('log')
    ),
    [t.stringLiteral('函数执行完成')],
  )
);

console.log(JSON.stringify(CONSOLE_AST), '\n\n', generate(CONSOLE_AST).code);


/* t.expressionStatement(
  t.callExpression(
    t.memberExpression(
      t.identifier('console'),
      t.identifier('log'),
    ),
    [t.stringLiteral('函数执行完成')]
  )
) */