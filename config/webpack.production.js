const Webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    path.join(__dirname, '..', 'client', 'router', 'index.js'),
  ],

  output: {
    path: path.join(__dirname, '..', 'public'),
    publicPath: '',
    filename: 'entry.js'
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'standard',
      exclude: /(node_modules|bower_components)/
    }],
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.css$/i, loader: 'style-loader!css-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'head'
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.OccurenceOrderPlugin()
  ]
};
