var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './index'),
  output: {
    path: path.resolve(__dirname, './ext'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
