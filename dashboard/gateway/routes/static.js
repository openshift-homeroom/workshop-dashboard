var express = require('express');

var app = express();

app.use(express.static('/opt/workshop/gateway/static'))

module.exports = app
