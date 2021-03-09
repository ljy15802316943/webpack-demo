const { resolve } = require('path');
// 自动生成html打包文件。
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 提取js文件里面的css代码。
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// webpack打包前删除之前的打包文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const webpack = require('webpack');

// 指定变量名，解决本地服务热更新失效的问题。
process.env.NODE_ENV = 'development';

module.exports = {
  // 打包入口文件, ./src/index.html解决本地服务开启HMR功能热更新失效的问题。
  entry: ['./src/js/index.js', './src/index.html'],
  // 打包出口文件。
  output: {
    // 打包js文件名和地址。
    filename: 'js/[name]-[contenthash:10].js',
    // 打包文件放置的目录地址。
    path: resolve(__dirname, 'build'),
    // 根据启动的服务变量改变路径。
    publicPath: process.env.TYPE === 'dev' ? '/' : './',
  },
  // loader配置。
  module: {
    rules: [
      // oneOf会提升打包构建速度，原理是loader处理文件时只会执行一次。
      // 注意：不能有两个配置同时处理一个文件。
      // 如果有的话就单独提出来。
      {
        oneOf: [
          {
            test: /.css$/,
            use: [
              // 把打包文件js代码里面的css抽离出来成为一个单独的css文件。
              {
                loader:MiniCssExtractPlugin.loader,
                //在这里设置publicPath的路径就是background-img的路径 
                options:{
                  publicPath: '../'
                }
              },
              'css-loader',
              // css兼容性处理，执行browserslist配置。
              'postcss-loader',
            ],
          },
          {
            test: /.less$/,
            use: [
              {
                loader:MiniCssExtractPlugin.loader,
                //在这里设置publicPath的路径就是background-img的路径 
                options:{
                  publicPath: '../'
                }
              },
              'css-loader',
              'less-loader',
            ]
          },
          {
            // 问题：默认处理不了打包文件html中img引入的本地图片
            test: /\.(png|jpg|gif|svg)$/,
            // 下载 url-loader file-loader
            loader: 'url-loader',
            // 打包资源配置
            options: {
              // 图片资源小于8kb,就会转为base64。
              // 优点：减少请求数量（减轻服务器压力）
              // 缺点：图片体积会更大（文件请求速度更慢）
              // 打包资源重命名
              // [hash:10] 取hash值的前10位作为文件命名，ext取原来的扩展名。
              // name: '[hash:10].[ext]',
              limit: 8 * 1024,
              name: '[name]-[hash:10].[ext]',
              // 图片打包路径。
              outputPath: 'img',
              // 打包文件访问图片路径。
              // publicPath: './img',
            }
          },
          {
            // 处理打包文件html中img引入的本地图片问题
            test: /\.html$/,
            loader: 'html-loader',
          },
          // eslint配置。
          // 1. 安装eslint库 cnpm i eslint eslint-loader -D
          // 2. package.json 新增eslintConfig对象,里面已经写了，可以去看。
          {
            test: /\.js$/,
            // 只检查自己写的源代码，第三方的库是不用检查的
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
              // 自动修复eslint的错误
              fix: true,
              // 开启babel缓存
              // 第二次构建时，会读取之前的缓存
              cacheDirectory: true,
            },
          },
        ],
      },
    ]
  },
  // 第三方插件配置。
  plugins: [
    // 配置全局变量的地方，js访问TYPE就能拿到package.json里面的变量。
    new webpack.DefinePlugin({
      TYPE: JSON.stringify(process.env.TYPE),
    }),
    new HtmlWebpackPlugin({
      // 打包文件 html的模板。
      template: './src/index.html',
      // 压缩html文件。
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      }
    }),
    // 提取打包文件js里面的css抽离出来成为一个单独的css文件。
    new MiniCssExtractPlugin({
      // css文件名和地址。
      filename: 'css/[name]-[contenthash:10].css',
    }),
    // 压缩css。
    new optimizeCssAssetsWebpackPlugin(),
    new CleanWebpackPlugin()
  ],
  // 代码分割。
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // 将当前模块的记录其他模块的hash单独打包为一个文件 runtime
    // 解决：修改a文件导致b文件的contenthash变化，也是缓存失效。
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    }
  },
  // 选择运行环境 development本地环境 production生产环境
  mode: 'development', 
  // 解决package.json 里面写入 browserslist 导致 webpack-dev-server 热更新失效的问题。
  target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  // 启动本地服务配置。
  // 本地开发服务配置
  devServer: {
    // 本地服务启动的文件夹。
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩。
    compress: true,
    // 路由重定向
    historyApiFallback: true,
    // 端口号
    port: 3000,
    // 域名
    host: 'localhost',
    // 默认开打浏览器。
    open: true,
    // 开启HMR功能，作用是局部更新。
    hot: true,
    // 不要显示启动服务器日志信息
    clientLogLevel: 'none',
    // 除了一些基本启动信息以外，其他内容都不要显示。
    quiet: true,
  }
}