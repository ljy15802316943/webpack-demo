// resolve 用来拼接绝对路径的方法
const { resolve } = require('path');
// plugins的插件，作用是打包文件自动生成 html文件，并且自动引入打包好的js文件。
const htmlWebpackPlugin = require('html-webpack-plugin');

// css提取为单独文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

// 设置nodejs环境变量,修改为开发环境.
process.env.NODE_ENV = 'development';

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
      // 多个loader用use处理，单个loader直接用loader处理。
      {
        // 处理css资源
        test: /\.css/,
        use: [
          // 'style-loader', 
          // 这个loader取代style-loader。作用：提取js中的css成单独文件。
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        /*
          postcss-loader作用:
          css兼容性处理: postcss --> postcss-loader postcss-preset-env
          postcss-preset-env作用: 找到 package.json 文件里面的浏览器兼容性配置 browserslist对象并执行里面的配置.

          browserslist对象 :
            "browserslist": {
              // 开发环境：如果要执行开发环境配置需要设置node环境变量：process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境：默认是执行生产环境。
              "production": [
                ">0.2%",
                "not dead",
                "not op_mini add"
              ]
            },
        */
        ]
      },
      {
        // 处理less资源
        test: /\.less/,
        use: [
          // 'style-loader', 
          // 这个loader取代style-loader。作用：提取js中的css成单独文件。
          MiniCssExtractPlugin.loader,
          'css-loader', 
          'less-loader'
        ]
      },
    ]
  },
  // 引入的插件配置。
  plugins: [
    new htmlWebpackPlugin({
      // 打包出口文件html的模板
      template: './src/index.html',
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      // 打包文件提取出的css文件放置路劲，和文件重命名。
      filename: 'css/built.css'
    }),
    // new optimizeCssAssetsWebpackPlugin()
  ],
  // 选择运行环境 development本地环境 production生产环境
  mode: 'development',
  // 解决package.json 里面写入 browserslist 导致 webpack-dev-server 热更新失效的问题。
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
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