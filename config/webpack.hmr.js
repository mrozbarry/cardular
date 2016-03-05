const Webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ROOT = path.join(__dirname, '..')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(ROOT, 'client', 'index.js'),
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
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    root: [
      path.join(ROOT, 'client')
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'head',
      template: path.join(ROOT, 'templates', 'index.html')
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.NoErrorsPlugin()
  ]
};
