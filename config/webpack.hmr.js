const Webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ROOT = path.join(__dirname, '..')

module.exports = {
  devtool: 'cheap-eval-source-map',

  entry: [
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
      loader: 'babel',
      exclude: /(node_modules|bower_components)/
    }],
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'html' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.styl'],
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
