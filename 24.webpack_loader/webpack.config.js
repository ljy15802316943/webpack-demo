const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'build')
  },
  // loader查找文件，找不到就找后面的文件。
  resolveLoader: {
    modules: ['node_modules', './loader'],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: 'replaceLoader',
            options: {
              name: 'js',
            }
          }
        ]
      },
    ]
  },
  // 各种插件配置
  plugins: [],
  // 模式
  mode: 'development', // 开发环境
}