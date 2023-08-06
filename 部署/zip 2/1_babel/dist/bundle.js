"use strict";

var _module = require("./module");

console.log("abc" + (0, _module.foo)());
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;

var foo = function foo() {
  return 30 * 15;
};

exports.foo = foo;
