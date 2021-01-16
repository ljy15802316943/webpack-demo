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
    path: resolve(__dirname, 'build'),
    // 打包后的html文件里面资源的引入路径。
    publicPath: './'
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置, 
      // 不同的文件资源需要下载不同的loader处理
      // 需要使用多个loader处理用 use，使用单个loader直接写loader就可以了。
      {
        // 匹配css文件
        test: /\.css$/,
        // 使用那些loader进行处理， 使用的loader 都需要下载。
        use: [ // loader的执行顺序是从下到上执行。
          'style-loader','css-loader'
        ]
      },
      {
        // 打包其他资源（除了html/js/css以外的其他资源）
        // 排除html/js/css资源
        exclude: /\.(html|css|js)$/,
        loader: 'file-loader',
        options: {
          // 打包后的资源名字默认时hash值。
          // [hash:10]取hash值的前10位作为打包图片的名字。
          // [ext]取文件原来的扩展名，如 .png。
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  // 各种插件配置
  plugins: [
    // 功能: 默认会创建一个空的HTML,自动引入打包输出的所有资源(JS/CSS)
    new htmlWebpackPlugin({
      // 这里的index.html文件会作为打包build下index.html文件的模板。
      template: './src/index.html',
    }),
    
  ],
  // 模式
  mode: 'development', // 开发环境
  // mode: 'production', // 生产环境

  // 配置本地开发服务器
  // 下载 webpack-dev-server包
  // 启动指令：npm start, 执行的是当前目录 package.json 文件里面的script里面的命令。
  // 本地开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器··）
  devServer: {
    // 本地服务一直运行的文件目录。
    contentBase: './build',
    // // 启动gzip压缩。
    compress: true,
    // 自动打开浏览器
    open: true,
    // // 端口号
    port: 3000
  }
}