const path = require('path');
// 引入webpack
const webpack = require('webpack');

module.exports = {
  // JavaScript 执行入口文件
  entry: './src/main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  // 加入插件
  plugins: [
    new webpack.DefinePlugin({
      TEACHER: JSON.stringify('lingtao'),
    })
  ]
};