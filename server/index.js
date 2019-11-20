var express = require('express');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./route/router');

var app = express();

// 开放静态资源
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

// 设置bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

// router
app.use(router);

app.listen(3000, function () {
  console.log('app running in port 3000')
});