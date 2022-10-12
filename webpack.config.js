const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    login: "./src/login.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  devServer:{
    static:{
      directory:path.join(__dirname,'dist')
    },
    compress:true,
    port:9008,
    hot:true,
    open:true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,"css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks:['index']
    }),
    new HTMLWebpackPlugin({
      filename: "login.html",
      template: "./src/login.html",
      chunks:['login']
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyWebpackPlugin({
      patterns:[
        {
          from:path.resolve(__dirname,'./src/img'),
          to:path.resolve(__dirname,'./dist/img'),
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename:'css/[name].css',
      chunkFilename:'css/[name].chunk.css'
    })
  ],
};
