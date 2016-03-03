var path = require('path'),
    express = require('express'),
    webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('../config/webpack.hmr.js'),
    isDeveloping = (process.env.NODE_ENV !== 'production'),
    port = (isDeveloping ? 3000 : process.env.PORT),
    app = express(),
    rootPath = path.join(__dirname, '..', 'public')

app.use(express.static(rootPath))

if (isDeveloping) {
  console.log('--- DEV MODE ---')
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

  app.get('*', function response(req, res) {
    const defaultFile = path.join(rootPath, 'index.html')

    res.write(middleware.fileSystem.readFileSync(defaultFile))
    res.end()
  })

} else {
  app.get('*', function response(req, res) {
    const defaultFile = path.join(rootPath, 'index.html')
    res.sendFile(defaultFile)
  })
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎  Listening on http://0.0.0.0:%s/ in your browser.', port)
})
