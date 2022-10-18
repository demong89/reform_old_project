const path  = require("path")
const webpack = require("webpack");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyjsPlugin = require("uglifyjs-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const VueLoaderPlugin = require("vue-loader/lib/plugin")



const config = {
  mode:'development',
  entry:{
    home:path.resolve(__dirname,'../src/mpa/home.js'),
    login:path.resolve(__dirname,'../src/mpa/login.js'),
  },
  output:{
    filename:'js/[name].js',
    path:path.resolve(__dirname,'../dist')
  },
  devServer:{
    static:{
      directory:path.resolve(__dirname,"../dist")
    },
    compress:true,
    port:9000,
    hot:true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
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
      {
        test:/\.ejs$/,
        loader:'ejs-loader',
        options:{
          esModule:false
        }
      },
      {
        test:/\.vue$/,
        loader:'vue-loader'
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname,"../public/index.html"),
      chunks: ["home"],
    }),
    new HTMLWebpackPlugin({
      filename: "login.html",
      template: path.resolve(__dirname,"../public/index.html"),
      chunks: ["login"],
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./../src/img"),
          to: path.resolve(__dirname, "./../dist/img"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].chunk.css",
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyjsPlugin({ /*sourceMap: true*/ }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      minSize: 100 * 1024,
      name: "common",
      cacheGroups: {
        jquery: {
          name: "juery",
          test: /jquery/, // 匹配名字
          chunks: "all",
        },

        "loadash-es": {
          name: "loadash-es",
          test: /loadash-es/, // 匹配名字
          chunks: "all",
        },
      },
    },
  },

}
module.exports = config
