import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../config/webpack.development.js';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

const rootPath = path.resolve(__dirname, '..', 'public')

app.use(express.static(rootPath));

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // contentBase: rootPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('/admin*', function response(req, res) {
    res.write(
      middleware.fileSystem.readFileSync(
        path.resolve(rootPath, 'public', 'admin.html')
      )
    );

    res.end();
  });

  app.get('*', function response(req, res) {
    res.write(
      middleware.fileSystem.readFileSync(
        path.resolve(rootPath, 'public', 'index.html')
      )
    );

    res.end();
  });

} else {
  app.get('/admin*', function () {
    res.sendFile(path.resolve(rootPath, 'admin.html'));
  })

  app.get('*', function response(req, res) {
    res.sendFile(path.resolve(rootPath, 'index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
