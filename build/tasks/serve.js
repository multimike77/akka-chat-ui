var gulp = require('gulp');
var browserSync = require('browser-sync');
var url = require('url');
var proxy = require('proxy-middleware');

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', ['build'], function(done) {
  var apiProxy = url.parse('http://localhost:8080');
  apiProxy.route = '/api';

  var sseProxy = url.parse('http://localhost:9000');
  sseProxy.route = '/sse';

  var mw = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  };

  browserSync({
    open: false,
    port: 9001,
    server: {
      baseDir: ['.'],
      middleware: [proxy(apiProxy), proxy(sseProxy)]
    }
  }, done);
});
