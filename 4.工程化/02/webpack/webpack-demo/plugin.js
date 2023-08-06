/**
 * 输出文件大小
 */
module.exports = class FileSizePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync(
      'FileSizePlugin',
      (compilation, callback) => {
        let str = ''
        for (let filename in compilation.assets){
          str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
        }
        compilation.assets['file.md'] = {
          source:function(){
            return str
          },
          size:function(){
            return str.length
          }
        }
        callback();
      }
    );
  }
}
