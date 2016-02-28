const Webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?reload=true',
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
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'head',
      template: path.join(__dirname, '..', 'templates', 'index.html')
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.NoErrorsPlugin()
  ]
};
