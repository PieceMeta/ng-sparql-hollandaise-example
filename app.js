var express = require('express'),
    path = require('path'),
    routes = require('./routes/index'),
    app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);

// send everything not caught by the
// router to the index page instead
// (for angular html5 mode)

app.use('*', function(req, res, next) {
  res.render('index');
});

module.exports = app;