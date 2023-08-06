var rollupProjectBaz = (function (exports) {
	'use strict';

	const baz = () => console.log('this is the baz module');

	exports.baz = baz;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
