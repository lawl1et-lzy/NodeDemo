var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 用于解析 cookie 头来填充 req.cookies（提供了访问 cookie 信息的便捷方法）。
var logger = require('morgan');
var exphbs  = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('hbs', exphbs({
  layoutsDir: 'views', // 设置布局模版文件的目录为 views 文件夹
  defaultLayout: 'layout', // 设置默认的页面布局模版为 layout.hbs 文件，跟 Express 2.x 中的 layout.ejs 作用类似。
  extname: '.hbs', // 模版文件使用的后缀名，这个 .hbs 是我们自定的，我们当然可以使用 .html 和 .handlebars 等作为后缀，只需把以上的 hbs 全部替换即可。
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    layout: false
  });
});

module.exports = app;
