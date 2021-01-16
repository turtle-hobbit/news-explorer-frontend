const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/js/index.js',
    articles: './src/js/savedArticles.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: { loader: "babel-loader" },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          (isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          {
            loader: 'css-loader',
            options: { importLoaders: 2 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(woff|woff2|ttf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./images/[name].[ext]&esModule=false',
          {
            loader: 'image-webpack-loader',
            options: {}
          },
        ]
      }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
            preset: ['default'],
        },
        canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['index'],
      template: './src/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['articles'],
      template: './src/saved-articles.html',
      filename: 'saved-articles.html'
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}