var express = require('express');
var createError = require('http-errors');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./routes/index');

var app = express();

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 设置bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

// 服务器路由router
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(3000, function () {
  console.log('app running in port 3000')
});