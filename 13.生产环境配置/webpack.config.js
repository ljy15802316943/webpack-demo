// resolve 用来拼接绝对路径的方法
const { resolve } = require('path');

// plugins的插件，作用是打包文件自动生成 html文件，并且自动引入打包好的js文件。
const htmlWebpackPlugin = require('html-webpack-plugin');

// css插件，把打包好的css文件放进指定目录。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置nodejs环境变量,修改为开发环境.
process.env.NODE_ENV = 'development';

module.exports = {
  // 打包入口文件
  entry: './src/js/index.js',
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
      // 多个loader用use处理，单个loader直接用loader处理。
      {
        // 处理css资源
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader, //  处理打包css文件放置目录。
          'css-loader',
          'postcss-loader', // css兼容处理，自动添加前缀。
        ],
      },
      {
        // 处理less资源
        test: /\.less/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      /*
        js兼容性处理： 
        1. 安装库：cnpm i babel-loader core-js @babel/core @babel/runtime @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime -D
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
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // 压缩图片 小于8kb自动转为base64.
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          // 图片打包后放入的文件夹名称。
          outputPath: 'img',
          // 解决打包文件html引入img的路径。
          publicPath: '/build/img',
        },
      },
      {
        // 处理html中img引入资源。
        test: /\.html/,
        loader: 'html-loader',
      },
      {
        // 处理其他资源
        exclude: /\.(js|css|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  // 引入的插件配置。
  plugins: [
    new htmlWebpackPlugin({
      // 打包出口文件html的模板
      template: './src/index.html',
      filename: 'index.html',
    }),
    // 打包样式文件指定目录。
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    // 压缩css。
    new optimizeCssAssetsWebpackPlugin(),
  ],
  // 解决package.json 里面写入 browserslist 导致 webpack-dev-server 热更新失效的问题。
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
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
    // 开启HMR功能，作用是热更新，只渲染修改的代码。
    // hot:  true,
  },
};
