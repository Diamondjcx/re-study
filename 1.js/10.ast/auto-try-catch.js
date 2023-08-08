module.exports = function ({ types: t, template }) {
  return {
    name: 'auto-try-catch',
    visitor: {
      AwaitExpression(path) {
        const shouldSkip = path.findParent(p => p.isTryStatement());
        if (!shouldSkip) {
          const blockStatement = path.findParent(p => p.isBlockStatement());
          if (blockStatement) {
            /* blockStatement.replaceWith(
              t.blockStatement([
                t.tryStatement(
                  blockStatement.node,
                  t.catchClause(
                    t.identifier('err'),
                    t.blockStatement([
                      t.expressionStatement(
                      t.callExpression(
                        t.memberExpression(
                          t.identifier('console'),
                          t.identifier('error')
                        ),
                        [t.identifier('err')],
                      )
                    )]
                  )
                  )
                )]
              )
            ) */
            
            blockStatement.replaceWith(
              t.blockStatement([
                template.ast(`
                  try ${blockStatement.toString()}
                  catch (err) {
                    console.error(err);
                  }
                `)
              ])
            )
          }
        }
      }
    }
  };
}




// try{}
/* 
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
} */