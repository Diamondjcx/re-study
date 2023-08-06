const fs = require('fs');
const util = require('util');
const path = require('path');
const webpack = require('webpack');
const { RawSource } = webpack.sources;
const readFile = util.promisify(fs.readFile)

class CompilationPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('CompilationPlugin', compilation => {
      compilation.hooks.additionalAssets.tapAsync('CompilationPlugin', async cb => {
        const content = '<script>console.log(1)</script>';
        compilation.assets['compilation.txt'] = {
          size() {
            return content.length;
          },
          source() {
            return content;
          }
        }
        compilation.emitAsset('compilation.js', new RawSource(content))
        
        const data = await readFile(path.resolve(__dirname, 'a.txt'));
        
        const newData = Buffer.concat([data, Buffer.from(content)])
        compilation.emitAsset('b.txt', new RawSource(newData));
        
        console.log(compilation.assets)
        
        cb();
      })
    });
  }
}

module.exports = CompilationPlugin;