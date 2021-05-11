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
    rules: [
      /*
        js兼容性处理： 
        1. 安装库：cnpm i babel-loader core-js @babel/core  @babel/runtime @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime -D
        1.1 @babel/preset-env。
          问题：只能转换基本语法，如promise不能转换。
        1.2 '@babel/polyfill 全部js兼容处理，js文件顶部引入 import '@babel/polyfill'就可以了。
          问题：引入所有的兼容性代码，体积变大了。
        1.3 core-js 按需加载引入的兼容性代码。

        2. 新建 .babelrc文件，里面内容已经写好了。
      */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  // 引入的插件配置。
  plugins: [
    new htmlWebpackPlugin({
      // 打包出口文件html的模板
      template: './src/index.html',
      filename: "index.html",
    }),
  ],
  // 选择运行环境 development本地环境 production生产环境
  mode: 'development',
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