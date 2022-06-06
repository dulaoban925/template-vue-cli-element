const { defineConfig } = require('@vue/cli-service')
const DefineOption = require('unplugin-vue-define-options/webpack')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [DefineOption()],
  },
})
