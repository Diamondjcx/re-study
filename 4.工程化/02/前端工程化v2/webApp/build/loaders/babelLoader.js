const { getOptions } = require('loader-utils');
const babel = require('@babel/core');
const util = require('util');
const { validate } = require('schema-utils');
const schema = require('./babelSchema.json');

const transform = util.promisify(babel.transform);
module.exports = function(content, map, meta) {
    // 获取参数
    const options = getOptions(this) || {};
    validate(schema, options, {
        name: 'babel loader'
    });

    const callback = this.async();

    // 正常执行babel
    transform(content, options)
        .then(({code, map}) => callback(null, code, map, meta))
        .catch(e => callback(e))
}