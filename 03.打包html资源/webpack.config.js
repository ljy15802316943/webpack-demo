/*
  webpack 配置文件
    作用：指示webpack 干那些活 (运行webpack指令时 会加载里面的指定配置)
    所用构建工具都是基于 node 平台运行
*/

// 安装webpack npm i webpack webpack-cli -D 安装到webpack本地依赖。

// resolve 用来拼接绝对路径的方法
const { resolve } = require('path');
// plugins的插件，作用是打包文件自动生成 html文件，并且自动引入打包好的js文件。
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // webpack 配置
  // 入口文件
  entry: './src/index.js',
  // 打包出口文件
  output: {
    // 输出文件名
    filename: 'build.js',
    // 输出路径
    // __dirname nodejs的变量，表示 02.打包样式资源 目录下 build文件目录的决定路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: []
  },
  // 各种插件配置
  plugins: [
    // 功能: 默认会创建一个空的HTML,自动引入打包输出的所有资源(JS/CSS)
    new htmlWebpackPlugin()
  ],
  // 模式
  mode: 'development', // 开发环境
  // mode: 'production', // 生产环境
}