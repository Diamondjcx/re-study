module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `vue1`,
      libraryTarget: 'umd',
    },
  },
}
