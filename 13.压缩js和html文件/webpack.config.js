// resolve 用来拼接绝对路径的方法
const { resolve } = require('path');
// plugins的插件，作用是打包文件自动生成 html文件，并且自动引入打包好的js文件。
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 打包入口文件
  entry: './src/index.js',
  // 打包出口文件
  output: {
    // 出口文件js名称
    filename: 'js/build.js',
    // __dirname表示绝对路径, huild文件目录。
    path: resolve(__dirname, 'build'),
  },
  // loader配置
  module: {
  },
  // 引入的插件配置。
  plugins: [
    new htmlWebpackPlugin({
      // 打包出口文件html的模板
      template: './src/index.html',
      filename: "index.html",
      // 压缩html文件。
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      }
    }),
  ],
  // 选择运行环境 development本地环境 production生产环境
  mode: 'production',
  // 本地开发服务配置
  devServer: {
    // 本地服务启动的文件夹。
    contentBase: resolve(__dirname, 'build'),
    // 打印本地服务配置信息
    compress: true,
    // 端口号
    port: 3000,
    // 默认开打浏览器。
    open: true,
  }
}