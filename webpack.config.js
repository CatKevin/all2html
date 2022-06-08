const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default
// const urlLoader = require('url-loader')

module.exports = {
  mode: 'production',
  entry: [
    './src/index.js',
    './src/style/style.css'
  ],
  output: {
    // filename: 'bundle.js',
    // path: path.resolve(__dirname, 'dist')
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: '[name]_[contenthash:8].css'
    }),
    // 使用项目的 index.html 作为模板，打包后会在 dist 生成一个新的 index.html（插入了 bundle.js 的 <script> 引入标签）
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inlineSource : '.(js|css)$' //全部内嵌
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlWebpackInlineSourcePlugin(),
  ],
  module: {
    rules: [
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[path][hash:18].[ext]',
      //     esModule: false
      //   }
      // },
      {
        test: /.(png|svg|jpg|jpeg|gif|mp3)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash:8].[ext]',
                    limit: 102400000000
                }
            }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  // resolve: {
  //   alias: {
  //     Assets: path.resolve(__dirname, 'assets/')
  //   }
  // }
}