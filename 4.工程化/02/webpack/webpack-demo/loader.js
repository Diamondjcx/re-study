
const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

module.exports = function(source) {
  const ast = parser.parse(source)
  const visitor = {
    CallExpression(path) {
      const { callee } = path.node
      if (types.isCallExpression(path.node) && types.isMemberExpression(callee)) {
        const { object, property } = callee
        if (object.name === 'console' && (property.name === 'log')) {
          path.remove()
        } else {
          return null
        }
      }
    }
  }
  traverse.default(ast, visitor)
  const newCode = generator.default(ast, {}, source).code;

  return newCode;
}