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
    // __dirname nodejs的变量，表示 02.打包样式资源 目录下 build文件目录的绝对路径
    path: resolve(__dirname, 'build'),
    // 输出文件里面的引入路径。
    publicPath: './',
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置, 
      // 不同的文件资源需要下载不同的loader处理
      {
        // 匹配那些文件
        test: /\.css$/,
        // 使用那些loader进行处理， 使用的loader 都需要下载。
        use: [ // loader的执行顺序是从下到上执行。
          // 创建style标签，将js的样式资源插入style标签，再把style标签插入到head生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串，完成后执行 上面的loader。
          'css-loader'
        ]
      },
      {
        // 匹配那些文件
        test: /\.less$/,
        // 使用那些loader进行处理， 使用的loader 都需要下载。
        use: [ // loader的执行顺序是从下到上执行。
          // 创建style标签，将js的样式资源插入style标签，再把style标签插入到head生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里面内容是样式字符串，完成后执行 上面的loader。
          'css-loader',
          // 将less文件编译成css文件。
          'less-loader',
        ]
      },
      {
        // 问题：默认处理不了打包文件html中img引入的本地图片
        test: /\.(png|jpg|gif|svg)$/,
        // 下载 url-loader file-loader
        loader: 'file-loader',
        // 打包资源配置
        options: {
          // 图片资源小于8kb,就会转为base64。
          // 优点：减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          // 打包资源重命名
          // [hash:10] 取hash值的前10位作为文件命名，ext取原来的扩展名。
          name: '[hash:10].[ext]',
          limit: 8 * 1024
        }
      },
      {
        // 处理打包文件html中img引入的本地图片问题
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  // 各种插件配置
  plugins: [
    // 功能: 默认会创建一个空的HTML,自动引入打包输出的所有资源(JS/CSS)
    new htmlWebpackPlugin({
      // 这里的index.html文件会作为打包build下index.html文件的模板。
      template: './src/index.html',
    })
  ],
  // 模式
  mode: 'development', // 开发环境
  // mode: 'production', // 生产环境
}