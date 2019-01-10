var express = require('express');
var fs = require('fs');

var app = express();

if (fs.existsSync('/opt/app-root/src/workshop/slides/index.html')) {
    app.use(express.static('/opt/app-root/src/workshop/slides'));
    app.use(express.static('/opt/workshop/reveal.js'));
}
else if (fs.existsSync('/opt/app-root/workshop/slides/index.html')) {
    app.use(express.static('/opt/app-root/workshop/slides'));
    app.use(express.static('/opt/workshop/reveal.js'));
}

module.exports = app
