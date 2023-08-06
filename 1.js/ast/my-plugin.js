module.exports = function (babel) {
  return {
    visitor: {
      VariableDeclaration(path, state) {
        path.node.declarations.forEach(each => {
          path.scope.rename(
            each.id.name,
            path.scope.generateUidIdentifier("uid").name
          );
        });
      }
    },
  }
}