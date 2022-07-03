const { defineConfig } = require('@vue/cli-service')
const DefineOption = require('unplugin-vue-define-options/webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 配置名称
const name = 'template-vue-cli-element'
// 开发服务启用端口
const port = 3000

module.exports = defineConfig({
  // babel-loader 转移 node_modules 第三方依赖
  transpileDependencies: true,
  publicPath: '/',
  // 打包输出路径
  outputDir: process.env.VUE_APP_DIST_PATH,
  // 相对于 outputDir 的静态文件目录
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  // 生产环境不需要 sourcemap
  productionSourceMap: false,
  // 开发服务器配置
  devServer: {
    port,
  },
  // webpack 配置
  configureWebpack: {
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      // 解决 webpack 打包 node 内置工具（如 path）报错问题
      fallback: { path: require.resolve('path-browserify') },
    },
    plugins: [DefineOption()],
  },
  // 对 webpack 配置进行细粒度更改
  chainWebpack(config) {
    // 开发环境启用 source-map
    config.when(process.env.NODE_ENV === 'development', config => config.devtool('source-map'))
  },
})
