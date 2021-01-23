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
    filename: 'build.js',
    // __dirname表示绝对路径, huild文件目录。
    path: resolve(__dirname, 'build'),
    // 出口资源的路径
    publicPath: "/"
  },
  // loader配置
  module: {
    rules: [
      // 多个loader用use处理，单个loader直接用loader处理。
      {
        // 处理css资源
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 处理less资源
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          // 压缩图片 小于8kb自动转为base64.
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
        }
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
          // 图片资源的路径
          outputPath: "/src",
        }
      }
    ]
  },
  // 引入的插件配置。
  plugins: [
    new htmlWebpackPlugin({
      // 打包出口文件html的模板
      template: './src/index.html',
    })
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