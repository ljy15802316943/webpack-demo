/*
  webpack 配置文件
    作用：指示webpack 干那些活 (运行webpack指令时 会加载里面的指定配置)
    所用构建工具都是基于 node 平台运行
*/

// 安装webpack npm i webpack webpack-cli -D 安装到webpack本地依赖。

// resolve 用来拼接绝对路径的方法
const { resolve } = require('path');

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
    ]
  },
  // 各种插件配置
  plugins: [],
  // 模式
  mode: 'development', // 开发环境
  // mode: 'production', // 生产环境
}