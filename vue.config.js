module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    proxy: 'http://gmall-h5-api.atguigu.cn'
  }
}
