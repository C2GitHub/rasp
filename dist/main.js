var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./route/router');

var app = express();

// 开放静态资源
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// 设置bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

// router
app.use(router);

app.listen(3000, function () {
  console.log('app running in port 3000')
});