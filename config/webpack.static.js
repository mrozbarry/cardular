const Webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ROOT = path.join(__dirname, '..')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    path.join(ROOT, 'client', 'router', 'index.js'),
  ],

  output: {
    path: path.join(ROOT, 'public'),
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
      { test: /\.css$/i, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    root: [
      path.join(ROOT, 'client', 'router'),
      path.join(ROOT, 'client', 'shared'),
      path.join(ROOT, 'client', 'profiles'),
      path.join(ROOT, 'client', 'join'),
      path.join(ROOT, 'client', 'game'),
      path.join(ROOT, 'client', 'admin')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'head'
    }),
    new Webpack.optimize.OccurenceOrderPlugin()
  ]
};