const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:"development",
  entry:'./src/index.js',
  output:{
    filename:'bundle.js',
    path:path.resolve(__dirname,'./dist')
  },
  plugins:[
    new HTMLWebpackPlugin({
      filename:'index.html',
      template:'./src/index.html'
    })
  ]
}
