// 树结构
// 前序遍历 根左右
const PreOrder = function (node) {
  if (node !== null) {
    console.log(node.val);
    PreOrder(node.left);
    PreOrder(node.right);
  }
};

// 中序遍历 左根右
const InOrder = function (node) {
  if (node !== null) {
    InOrder(node.left);
    console.log(node.val);
    InOrder(node.right);
  }
};

// 后序遍历 左右根

const PostOrder = function (node) {
  if (node !== null) {
    PostOrder(node.left);
    PostOrder(node.right);
    console.log(node.val);
  }
};
