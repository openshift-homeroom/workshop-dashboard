var express = require('express');
var fs = require('fs');

var app = express();

if (fs.existsSync('/opt/app-root/src/workshop/slides')) {
    app.use(express.static('/opt/app-root/src/workshop/slides'));
}
else if (fs.existsSync('/opt/app-root/workshop/slides')) {
    app.use(express.static('/opt/app-root/workshop/slides'));
}

module.exports = app
