var rollupProjectFoo = (function (exports) {
	'use strict';

	const foo = () => console.log('this is the foo module');

	exports.foo = foo;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
